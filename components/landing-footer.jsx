export function LandingFooter() {
  return (
    <footer className="border-t bg-white dark:bg-gray-950 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
             <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  RC
                </div>
                <span className="font-bold text-xl tracking-tight">ResumeCraft</span>
              </div>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed max-w-xs">
              AI-powered resume builder helping you craft professional, ATS-friendly resumes that get you hired.
            </p>
            <div className="flex space-x-4">
               {/* Social Icons */}
               <SocialIcon>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
               </SocialIcon>
               <SocialIcon>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
               </SocialIcon>
               <SocialIcon>
                   <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg>
               </SocialIcon>
            </div>
          </div>
          
          <FooterColumn title="Product">
             <FooterLink href="#">Features</FooterLink>
             <FooterLink href="#">Pricing</FooterLink>
             <FooterLink href="#">Templates</FooterLink>
             <FooterLink href="#">ATS Checker</FooterLink>
          </FooterColumn>

          <FooterColumn title="Resources">
             <FooterLink href="#">Resume Guide</FooterLink>
             <FooterLink href="#">Career Blog</FooterLink>
             <FooterLink href="#">Interview Prep</FooterLink>
             <FooterLink href="#">Help Center</FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
             <FooterLink href="#">About Us</FooterLink>
             <FooterLink href="#">Contact</FooterLink>
             <FooterLink href="#">Privacy Policy</FooterLink>
             <FooterLink href="#">Terms of Service</FooterLink>
          </FooterColumn>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <p className="text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} ResumeCraft. All rights reserved.
          </p>
          <div className="flex gap-6">
             <FooterLink href="#">Privacy</FooterLink>
             <FooterLink href="#">Terms</FooterLink>
             <FooterLink href="#">Sitemap</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
      <ul className="space-y-3">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }) {
  return (
    <li>
      <a href={href} className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        {children}
      </a>
    </li>
  )
}

function SocialIcon({ children }) {
  return (
    <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-all duration-300">
       {children}
    </a>
  )
}
