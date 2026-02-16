# Education Date Parsing - Implementation Guide

## Overview
The education extraction now properly parses date ranges from the `year` field into separate `startDate` and `endDate` fields that work with the month input fields in the resume builder.

## Problem
The API was returning education dates in the `year` field as a string like:
- `"June 2023 – June 2025"`
- `"January 2020 - May 2024"`
- `"Sep 2019 – Dec 2023"`

But the UI needed:
- `startDate`: `"2023-06"` (YYYY-MM format)
- `endDate`: `"2025-06"` (YYYY-MM format)

## Solution

### Date Parsing Logic
The transformation logic in `app/create-resume/page.js` now:

1. **Splits the date range** using various dash characters (–, —, -)
2. **Extracts month and year** from each part using regex
3. **Converts to YYYY-MM format** for HTML month inputs

### Code Implementation

```javascript
education: (extractedData.education || []).map((edu) => {
  let startDate = "";
  let endDate = "";
  
  // Parse year field like "June 2023 – June 2025" into startDate and endDate
  if (edu.year) {
    const parts = edu.year.split(/–|—|-/).map(p => p.trim());
    
    const monthMap = {
      January: "01", Jan: "01",
      February: "02", Feb: "02",
      March: "03", Mar: "03",
      April: "04", Apr: "04",
      May: "05",
      June: "06", Jun: "06",
      July: "07", Jul: "07",
      August: "08", Aug: "08",
      September: "09", Sep: "09",
      October: "10", Oct: "10",
      November: "11", Nov: "11",
      December: "12", Dec: "12",
    };
    
    // Parse start date
    if (parts[0]) {
      const startMatch = parts[0].match(/(\w+)\s+(\d{4})/);
      if (startMatch) {
        const month = monthMap[startMatch[1]];
        const year = startMatch[2];
        if (month && year) startDate = `${year}-${month}`;
      }
    }
    
    // Parse end date
    if (parts[1]) {
      const endMatch = parts[1].match(/(\w+)\s+(\d{4})/);
      if (endMatch) {
        const month = monthMap[endMatch[1]];
        const year = endMatch[2];
        if (month && year) endDate = `${year}-${month}`;
      }
    }
  }
  
  return {
    degree: edu.degree || "",
    institution: edu.institution || "",
    field: "",
    startDate: startDate,
    endDate: endDate,
    gpa: edu.score || "",
  };
})
```

## Supported Date Formats

The parser handles various formats:

### Full Month Names
- `"June 2023 – June 2025"` → `startDate: "2023-06"`, `endDate: "2025-06"`
- `"January 2020 - May 2024"` → `startDate: "2020-01"`, `endDate: "2024-05"`
- `"September 2019 — December 2023"` → `startDate: "2019-09"`, `endDate: "2023-12"`

### Abbreviated Month Names
- `"Jan 2023 – Jun 2025"` → `startDate: "2023-01"`, `endDate: "2025-06"`
- `"Sep 2019 - Dec 2023"` → `startDate: "2019-09"`, `endDate: "2023-12"`

### Different Dash Characters
The parser recognizes:
- Regular hyphen: `-`
- En dash: `–`
- Em dash: `—`

## Month Mapping

The parser supports both full and abbreviated month names:

| Full Name  | Abbreviation | Code |
|------------|--------------|------|
| January    | Jan          | 01   |
| February   | Feb          | 02   |
| March      | Mar          | 03   |
| April      | Apr          | 04   |
| May        | May          | 05   |
| June       | Jun          | 06   |
| July       | Jul          | 07   |
| August     | Aug          | 08   |
| September  | Sep          | 09   |
| October    | Oct          | 10   |
| November   | Nov          | 11   |
| December   | Dec          | 12   |

## Examples

### Example 1: Full Month Names
**API Response:**
```json
{
  "degree": "Bachelor of Science",
  "institution": "University of Example",
  "year": "June 2023 – June 2025",
  "score": "3.8 GPA"
}
```

**Transformed Data:**
```javascript
{
  degree: "Bachelor of Science",
  institution: "University of Example",
  field: "",
  startDate: "2023-06",  // ← Parsed from "June 2023"
  endDate: "2025-06",    // ← Parsed from "June 2025"
  gpa: "3.8 GPA"
}
```

### Example 2: Abbreviated Months
**API Response:**
```json
{
  "degree": "Master of Arts",
  "institution": "Tech University",
  "year": "Sep 2021 - May 2023",
  "score": "4.0"
}
```

**Transformed Data:**
```javascript
{
  degree: "Master of Arts",
  institution: "Tech University",
  field: "",
  startDate: "2021-09",  // ← Parsed from "Sep 2021"
  endDate: "2023-05",    // ← Parsed from "May 2023"
  gpa: "4.0"
}
```

### Example 3: Single Year (No Range)
**API Response:**
```json
{
  "degree": "High School Diploma",
  "institution": "Example High School",
  "year": "2020",
  "score": ""
}
```

**Transformed Data:**
```javascript
{
  degree: "High School Diploma",
  institution: "Example High School",
  field: "",
  startDate: "",  // ← No match, stays empty
  endDate: "",    // ← No match, stays empty
  gpa: ""
}
```

## UI Integration

The parsed dates work seamlessly with HTML month input fields:

```html
<Input
  type="month"
  value={edu.startDate || ""}
  placeholder="Start Date"
/>

<Input
  type="month"
  value={edu.endDate || ""}
  placeholder="End Date"
/>
```

## Edge Cases Handled

1. **Missing dates**: If parsing fails, fields remain empty strings
2. **Single date**: If only one date is present, only that field is populated
3. **Invalid format**: Gracefully handles unrecognized formats by leaving fields empty
4. **Various dash types**: Handles –, —, and - characters

## Benefits

✅ **Automatic parsing**: No manual date entry needed  
✅ **Format flexibility**: Handles multiple date formats  
✅ **UI compatibility**: Outputs YYYY-MM format for month inputs  
✅ **Error resilient**: Doesn't break on invalid formats  
✅ **User-friendly**: Dates appear correctly in the resume builder
