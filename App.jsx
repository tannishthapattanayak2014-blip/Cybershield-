import React, { useState, useMemo, useEffect } from "react";
import {
  Shield, Lock, AlertTriangle, Mail, Phone, MessageSquare, Bug, HardDrive,
  Eye, KeyRound, Database, UserX, Wifi, Globe, Download, Usb, Home,
  BookOpen, Radar, CheckSquare, HelpCircle, ChevronRight, ChevronLeft, X, Check,
  ArrowLeft, Award, Zap, RefreshCw, Search, Flame, Radio, ShieldAlert,
  ShieldCheck, LifeBuoy, Sparkles
} from "lucide-react";

/* ============================== DATA ============================== */

const LESSONS = [
  { id: "l1", title: "What is cybersecurity?", icon: Shield,
    body: "Cybersecurity is the practice of protecting your devices, accounts, and information from people who want to access, damage, or steal them without permission. Think of it like locking your front door — except the door is your phone, laptop, or online account.",
    takeaway: "Cybersecurity = the habits and tools that keep your digital life locked and safe." },
  { id: "l2", title: "Why cybersecurity matters", icon: ShieldAlert,
    body: "Your photos, messages, school accounts, and even your identity live online. If someone breaks into an account, they can impersonate you, steal money, or hurt people you know. Good habits now prevent big headaches later.",
    takeaway: "Small habits today prevent big problems tomorrow." },
  { id: "l3", title: "Personal data & digital privacy", icon: Eye,
    body: "Personal data includes your name, address, birthday, school, photos, and passwords. Once shared online, it's hard to take back. Always ask: 'Would I want a stranger to have this?' before posting or entering information.",
    takeaway: "If you wouldn't shout it in public, don't post it online." },
  { id: "l4", title: "Strong passwords", icon: KeyRound,
    body: "A strong password is long (12+ characters), unique to each account, and avoids obvious info like your name or birthday. A passphrase like 'PurpleLizard$JumpsFast!' is both strong and easier to remember than random characters.",
    takeaway: "Long, unique, and unpredictable beats short and 'clever'." },
  { id: "l5", title: "Multi-factor authentication", icon: Lock,
    body: "Multi-factor authentication (MFA) asks for a second proof of identity — like a code sent to your phone — in addition to your password. Even if someone steals your password, they still can't get in without that second step.",
    takeaway: "MFA is a second lock on the same door — turn it on everywhere you can." },
  { id: "l6", title: "Software updates", icon: RefreshCw,
    body: "Updates aren't just new features — they patch security holes that attackers already know how to exploit. Delaying an update leaves that door open longer than it needs to be.",
    takeaway: "Update promptly; it's free protection." },
  { id: "l7", title: "Safe browsing", icon: Globe,
    body: "Check that a site's address looks correct before entering information, look for HTTPS (the padlock icon), and be cautious of pop-ups demanding urgent action. Legitimate sites rarely pressure you to act instantly.",
    takeaway: "Slow down and check the address bar before you click or type." },
  { id: "l8", title: "Public Wi-Fi safety", icon: Wifi,
    body: "Public Wi-Fi at cafes or airports is often unencrypted, meaning others on the same network could potentially see your traffic. Avoid logging into sensitive accounts on public Wi-Fi, or use a trusted VPN.",
    takeaway: "Treat public Wi-Fi like a shared room — don't shout secrets in it." },
  { id: "l9", title: "Backups", icon: HardDrive,
    body: "A backup is a saved copy of your files stored somewhere separate, like cloud storage or an external drive. If ransomware, a broken device, or an accident wipes your data, a backup means you don't lose everything.",
    takeaway: "If it only exists in one place, it doesn't really exist safely." },
  { id: "l10", title: "Digital footprints", icon: Search,
    body: "Every post, comment, and search leaves a trace that can follow you for years — schools and employers sometimes look. Think about what your digital footprint says about you before you leave it.",
    takeaway: "The internet remembers. Post like it's permanent, because it often is." },
];

const THREATS = [
  { id: "t1", name: "Phishing", icon: Mail, severity: "High",
    what: "A fake email or message designed to trick you into clicking a bad link or giving up personal information by pretending to be someone trustworthy.",
    signs: ["Urgent or scary subject lines", "Requests for passwords or personal info", "Mismatched or strange sender address", "Generic greetings like 'Dear User'"],
    example: "A message claiming to be from your school's IT department says your account will be deleted in 1 hour unless you 'verify' by clicking a link and entering your password.",
    prevent: ["Never click links in unexpected messages", "Type the official website address yourself", "Check the sender's real email address", "Ask a trusted adult if a message feels off"],
    whatToDo: ["Don't click anything", "Report the message to the platform or your school", "Delete it", "Tell a trusted adult or teacher"] },
  { id: "t2", name: "Smishing", icon: MessageSquare, severity: "High",
    what: "Phishing that happens over text message (SMS) instead of email, often pretending to be a delivery service, bank, or prize notification.",
    signs: ["Unexpected texts about packages or prizes", "Shortened or unfamiliar links", "Pressure to act 'right now'", "Requests to reply with a code"],
    example: "A text says: 'Your package is held at customs. Pay a small fee here to release it.' The link goes to a fake payment page.",
    prevent: ["Don't tap links in unexpected texts", "Verify directly with the company through its official app or site", "Block and report unknown senders"],
    whatToDo: ["Don't tap the link or reply", "Block the number", "Report as spam", "Tell a trusted adult"] },
  { id: "t3", name: "Vishing", icon: Phone, severity: "Medium",
    what: "A phone call scam where someone impersonates a trusted organization to pressure you into sharing information or making a payment.",
    signs: ["Caller creates urgency or fear", "Asks for passwords, codes, or gift cards", "Claims to be tech support or law enforcement", "Refuses to let you call back on an official number"],
    example: "A caller claims to be from 'tech support' saying your computer has a virus, and asks you to read out a code that was just texted to you.",
    prevent: ["Never share one-time codes over the phone", "Hang up and call the organization back using its official number", "Remember real organizations rarely ask for payment via gift cards"],
    whatToDo: ["Hang up", "Don't share any codes or info", "Verify by calling the official number yourself", "Tell a trusted adult"] },
  { id: "t4", name: "Malware", icon: Bug, severity: "High",
    what: "Short for 'malicious software' — programs designed to damage, spy on, or take control of a device without permission.",
    signs: ["Device suddenly runs slowly", "Unexpected pop-ups or new toolbars", "Unfamiliar apps appear", "Battery drains unusually fast"],
    example: "A student downloads a 'free' game mod from an unofficial site, and afterward strange pop-up ads start appearing constantly.",
    prevent: ["Only download from official app stores", "Keep software updated", "Use built-in security tools", "Avoid pirated software"],
    whatToDo: ["Disconnect from the internet", "Run a security scan", "Tell a trusted adult", "Change passwords from a different, clean device"] },
  { id: "t5", name: "Ransomware", icon: Lock, severity: "High",
    what: "A type of malware that locks or encrypts your files and demands payment to get them back.",
    signs: ["Files suddenly won't open", "A message demanding payment appears on screen", "File names or extensions change unexpectedly"],
    example: "A user opens an email attachment labeled 'invoice.exe' and their files become locked with a ransom note demanding payment in cryptocurrency.",
    prevent: ["Never open unexpected attachments", "Keep regular backups", "Keep software updated", "Use trusted security software"],
    whatToDo: ["Disconnect the device from the network", "Don't pay the ransom", "Tell a trusted adult immediately", "Restore from a backup if available"] },
  { id: "t6", name: "Spyware", icon: Eye, severity: "Medium",
    what: "Software that secretly monitors your activity, keystrokes, or screen without your knowledge and sends that data to someone else.",
    signs: ["Device behaves strangely or slows down", "Unfamiliar apps with broad permissions", "Increased data usage"],
    example: "A free 'battery saver' app quietly requests permission to read messages and location, then shares that data with advertisers.",
    prevent: ["Review app permissions before installing", "Only install from official stores", "Regularly check which apps have access to your camera, mic, and location"],
    whatToDo: ["Uninstall the suspicious app", "Run a security scan", "Change passwords", "Tell a trusted adult"] },
  { id: "t7", name: "Social engineering", icon: UserX, severity: "High",
    what: "Manipulating people (rather than computers) into giving up information or access, often by pretending to be someone trustworthy or exploiting emotions like fear or urgency.",
    signs: ["Unusual requests from 'friends' or 'authority figures'", "Emotional pressure (fear, excitement, urgency)", "Requests to bypass normal steps"],
    example: "A message from a 'classmate's' hacked account asks you to send a gift card code quickly to help with an 'emergency.'",
    prevent: ["Verify identity through a separate channel", "Slow down when something feels urgent", "Never share codes or passwords, even with 'friends'"],
    whatToDo: ["Pause and verify before acting", "Contact the person directly through another method", "Tell a trusted adult", "Report the account if hacked"] },
  { id: "t8", name: "Password attacks", icon: KeyRound, severity: "Medium",
    what: "Attempts to guess or crack your password, often using common passwords, personal info, or automated tools against reused passwords from other breaches.",
    signs: ["Login alerts from unfamiliar locations", "Being locked out of an account unexpectedly", "Notifications of 'too many failed attempts'"],
    example: "Someone reuses the same password on multiple sites; when one site is breached, attackers try that same password everywhere else.",
    prevent: ["Use a unique password for every account", "Use a password manager", "Enable MFA", "Make passwords long and unpredictable"],
    whatToDo: ["Change the affected password immediately", "Change it everywhere it was reused", "Enable MFA", "Tell a trusted adult if it's a shared or school account"] },
  { id: "t9", name: "Data breaches", icon: Database, severity: "Medium",
    what: "An incident where a company's stored data — including usernames, passwords, or personal info — is exposed or stolen, often without you doing anything wrong.",
    signs: ["An email notifying you your data was in a breach", "Strange login attempts", "Increase in spam or phishing attempts afterward"],
    example: "A gaming website you use is hacked, and your username, email, and password are leaked online.",
    prevent: ["Use unique passwords so one breach doesn't affect other accounts", "Check breach-notification services", "Enable MFA"],
    whatToDo: ["Change the affected password", "Change it on any other site where it was reused", "Monitor accounts for suspicious activity", "Tell a trusted adult"] },
  { id: "t10", name: "Identity theft", icon: UserX, severity: "High",
    what: "When someone uses your personal information — like your name, birthday, or ID numbers — to pretend to be you, often for financial gain.",
    signs: ["Unfamiliar accounts opened in your name", "Mail or notifications about accounts you didn't create", "Friends receiving messages 'from you' that you didn't send"],
    example: "A student's personal details, shared in a fake contest form, are later used to open an account they never created.",
    prevent: ["Limit how much personal info you share online", "Be cautious with contests and quizzes that ask for personal details", "Use privacy settings on social accounts"],
    whatToDo: ["Tell a trusted adult right away", "Report to the affected platform or institution", "Change passwords on related accounts", "Document what happened"] },
  { id: "t11", name: "DDoS attacks", icon: Radio, severity: "Low",
    what: "An attack that floods a website or service with traffic to overwhelm it and knock it offline. This usually targets organizations, not individuals directly.",
    signs: ["A normally reliable website or game server suddenly won't load", "Widespread reports of an outage"],
    example: "A popular game's servers go down for hours after being flooded with fake traffic, and players can't log in.",
    prevent: ["This is mostly defended at the organizational level", "Individuals should never participate in or encourage such attacks — it's illegal", "Report suspicious 'booter' services if encountered"],
    whatToDo: ["Wait for the service to restore access", "Follow official status updates", "Report anyone encouraging you to join such an attack to a trusted adult"] },
  { id: "t12", name: "Fake websites", icon: Globe, severity: "Medium",
    what: "Websites designed to look like a real, trusted site in order to steal login information or payment details.",
    signs: ["Slightly misspelled web addresses", "Missing padlock/HTTPS", "Low-quality design compared to the real site", "Arrived via a link in an email or ad rather than typing the address"],
    example: "A page styled exactly like a popular shopping site uses the address 'amaz0n-deals.com' to collect login details.",
    prevent: ["Type website addresses directly instead of clicking links", "Double-check the spelling of the domain", "Look for HTTPS and a valid padlock"],
    whatToDo: ["Close the page without entering info", "Report the site if possible", "If info was entered, change that password immediately", "Tell a trusted adult"] },
  { id: "t13", name: "Online scams", icon: AlertTriangle, severity: "Medium",
    what: "Deceptive schemes designed to trick you out of money, gifts, or information — including fake giveaways, too-good-to-be-true offers, and fraudulent sellers.",
    signs: ["Promises that seem too good to be true", "Requests for payment via gift cards or crypto", "Pressure to act immediately", "Poor grammar or generic messaging"],
    example: "A pop-up claims you've won a free gaming console and just need to 'pay shipping' by entering your card details.",
    prevent: ["Remember: if it sounds too good to be true, it usually is", "Never pay to 'claim' a prize", "Research sellers before purchasing"],
    whatToDo: ["Close the page", "Don't enter payment info", "Report the scam", "Tell a trusted adult"] },
  { id: "t14", name: "Malicious downloads", icon: Download, severity: "High",
    what: "Files, apps, or attachments that appear useful or fun but secretly contain malware once opened or installed.",
    signs: ["Files from unofficial sources", "Unexpected file extensions like .exe on what should be a document", "Requests for unusual permissions during install"],
    example: "A 'free homework helper' app downloaded from a random site turns out to install unwanted software alongside it.",
    prevent: ["Only download from official, trusted sources", "Check reviews and permissions before installing", "Keep security software active"],
    whatToDo: ["Delete the file/app immediately", "Run a security scan", "Tell a trusted adult", "Change passwords if anything was entered"] },
  { id: "t15", name: "Unsafe USB devices", icon: Usb, severity: "Medium",
    what: "USB drives or cables that contain malware and infect a device automatically when plugged in — sometimes left in public as bait ('USB drops').",
    signs: ["A USB drive found in a public place (parking lot, hallway)", "An unfamiliar drive with a tempting label like 'Final Grades'", "A borrowed charging cable that behaves oddly"],
    example: "A USB drive labeled 'Free Music' is found in the school hallway; plugging it into a laptop silently installs malware.",
    prevent: ["Never plug in an unknown USB device", "Turn in found drives to a trusted adult instead of using them", "Use only your own charging cables at public charging stations"],
    whatToDo: ["Don't plug it in", "Give it to a trusted adult or IT staff", "If already plugged in, disconnect and run a security scan"] },
];

const SPOT_ITEMS = [
  { id: "s1", label: "Email", text: "\"Your school library account has a $0.00 balance. No action needed — just an automatic monthly notice.\"", answer: "safe",
    reason: "Safe. It's a routine, non-urgent notice with no links, requests, or pressure to act." },
  { id: "s2", label: "Text", text: "\"Hi, it's Mom, I lost my phone, this is my new number, I need you to send me a gift card code right away, don't tell Dad.\"", answer: "dangerous",
    reason: "Dangerous. Urgency, secrecy, and a request for gift card codes are classic social-engineering red flags — verify by calling a known number." },
  { id: "s3", label: "Pop-up", text: "\"Congratulations! You are the 1,000,000th visitor! Click to claim your free prize now!\"", answer: "dangerous",
    reason: "Dangerous. Random 'you won' pop-ups are a classic scam pattern designed to get clicks or payment info." },
  { id: "s4", label: "Email", text: "From: newsletter@yourschool.edu — 'Reminder: parent-teacher conferences are next Thursday. See the school website for scheduling.'", answer: "safe",
    reason: "Safe. It's from a recognizable school domain, has no urgent demands, and points to the official website rather than a strange link." },
  { id: "s5", label: "Message", text: "\"Someone tried to log into your account from a new device. If this wasn't you, click here immediately to secure your account: bit.ly/2xAcc9\"", answer: "suspicious",
    reason: "Suspicious. This could be legitimate, but shortened links and urgency are also common phishing tactics — go to the official site directly instead of clicking." },
  { id: "s6", label: "Login page", text: "A page styled like your email provider, but the address bar shows 'mail-secure-login.info' instead of the real domain.", answer: "dangerous",
    reason: "Dangerous. A mismatched domain trying to imitate a real login page is a classic fake-website phishing setup." },
  { id: "s7", label: "Text", text: "\"Your ride is arriving in 3 minutes. Driver: Alex, License Plate: ABC123.\"", answer: "safe",
    reason: "Safe. This matches a routine automated notification from a ride-sharing app with no request for info or action." },
  { id: "s8", label: "DM", text: "\"hey it's ur friend jordan lol i found this site that gives free game currency, just log in with ur game account here: freegamecoins-vip.net\"", answer: "dangerous",
    reason: "Dangerous. 'Free' rewards that require your login credentials on a third-party site are a common way accounts get stolen." },
];

const SCENARIOS = [
  { id: "sc1", situation: "You receive a message saying you've won a prize and must click a link immediately to claim it.",
    choices: ["Click the link right away before the offer expires", "Ignore or delete the message and don't click anything", "Reply asking for more details", "Forward it to friends so they can win too"],
    correct: 1, explain: "Legitimate prizes don't require urgent clicks. The safest move is to not engage — delete or report it." },
  { id: "sc2", situation: "A pop-up says your computer is infected and to call a phone number immediately for 'tech support.'",
    choices: ["Call the number right away", "Close the browser/tab and run a security scan through your actual antivirus software", "Give them remote access to fix it", "Restart and ignore it forever without checking anything"],
    correct: 1, explain: "Real security warnings don't ask you to call a number. Close the pop-up and check your device using trusted security software." },
  { id: "sc3", situation: "A classmate's account messages you asking to borrow your login for an assignment site 'just this once.'",
    choices: ["Share your password since it's a friend", "Politely decline and suggest they ask a teacher for their own access", "Share it but change your password right after", "Ignore the message completely without responding"],
    correct: 1, explain: "Never share passwords, even with friends. Suggesting they get their own access keeps both accounts safe." },
  { id: "sc4", situation: "You find a USB drive labeled 'Final Exam Answers' on a school computer desk.",
    choices: ["Plug it in out of curiosity", "Turn it in to a teacher or IT staff without plugging it in", "Take it home to check later", "Plug it into your phone instead of a computer"],
    correct: 1, explain: "Unknown USB drives can carry malware that installs automatically. Hand it to a trusted adult instead of plugging it in." },
  { id: "sc5", situation: "An app you're installing asks for permission to access your contacts, camera, and location, even though it's just a calculator app.",
    choices: ["Grant all permissions since apps usually need them", "Deny the unnecessary permissions or avoid installing the app", "Grant permissions but delete the app in a week", "Ignore the request and it will resolve itself"],
    correct: 1, explain: "Apps should only request permissions relevant to their function. Excessive permission requests are a red flag." },
  { id: "sc6", situation: "You get an email that looks like it's from your bank asking you to 'verify your account' by entering your password on a linked page.",
    choices: ["Click the link and enter your info to be safe", "Go to the bank's official site or app directly instead of clicking the link", "Reply to the email with your account number", "Forward it to a friend to check first"],
    correct: 1, explain: "Never enter credentials through an email link. Go to the official site/app directly to check your account status." },
  { id: "sc7", situation: "While using café Wi-Fi, you want to log into your school portal to check a grade.",
    choices: ["Log in normally, it's fine", "Wait until you're on a trusted network, or use a VPN if you must use public Wi-Fi", "Ask a stranger nearby for their hotspot instead", "Use the café Wi-Fi but with a fake password"],
    correct: 1, explain: "Public Wi-Fi can expose your traffic. Save sensitive logins for trusted networks or use a VPN." },
  { id: "sc8", situation: "You accidentally clicked a suspicious link and now worry your info might be exposed.",
    choices: ["Do nothing and hope it's fine", "Tell a trusted adult, change relevant passwords, and monitor your accounts", "Click it again to see what happens", "Delete your entire account permanently"],
    correct: 1, explain: "Acting quickly — telling someone and changing passwords — limits the damage. Panic or ignoring it makes things worse." },
  { id: "sc9", situation: "A 'friend' online you've never met in person asks for your home address to 'send you a gift.'",
    choices: ["Share it since they seem nice", "Decline sharing personal details with someone you haven't verified in person", "Share a fake address instead", "Ask them to send the gift to your school"],
    correct: 1, explain: "Online strangers, even friendly ones, shouldn't receive personal details like your home address." },
  { id: "sc10", situation: "You notice strange posts appearing on your social account that you didn't make.",
    choices: ["Ignore it, it will go away", "Change your password immediately, enable MFA, and review account activity", "Delete the app but keep the same password", "Post publicly asking what happened"],
    correct: 1, explain: "Strange activity usually means the account was compromised. Securing it immediately limits further damage." },
];

const QUIZ = [
  { q: "What is 'phishing'?", type: "mcq", options: ["A type of computer virus", "A fake message trying to trick you into giving up info", "A slow internet connection", "A software update"], correct: 1, diff: "Beginner",
    explain: "Phishing is a deceptive message pretending to be trustworthy in order to steal information." },
  { q: "True or False: You should use the same strong password for every account so it's easier to remember.", type: "tf", options: ["True", "False"], correct: 1, diff: "Beginner",
    explain: "False — reusing passwords means one breach can compromise all your accounts. Use a unique password for each." },
  { q: "What does MFA stand for?", type: "mcq", options: ["Multi-Factor Authentication", "Mainframe Access", "My First App", "Malware Free Access"], correct: 0, diff: "Beginner",
    explain: "MFA (Multi-Factor Authentication) adds a second step beyond your password to verify it's really you." },
  { q: "True or False: Software updates are mostly just about new features, so it's fine to skip them.", type: "tf", options: ["True", "False"], correct: 1, diff: "Beginner",
    explain: "False — updates often patch security vulnerabilities. Delaying them leaves you exposed." },
  { q: "Which is the safest habit before entering info on a website?", type: "mcq", options: ["Check the address bar and look for HTTPS", "Click the first link in a search result", "Trust any site that looks nice", "Enter info quickly before a timer runs out"], correct: 0, diff: "Beginner",
    explain: "Checking the address and looking for HTTPS helps confirm you're on the real, secure site." },
  { q: "True or False: A backup means having your only copy of files on your laptop.", type: "tf", options: ["True", "False"], correct: 1, diff: "Beginner",
    explain: "False — a backup should be a separate copy, like on the cloud or another device, in case the original is lost." },
  { q: "What is a 'digital footprint'?", type: "mcq", options: ["A virus that tracks your mouse", "The trail of data you leave through your online activity", "A type of firewall", "A backup file format"], correct: 1, diff: "Beginner",
    explain: "Your digital footprint is the lasting trace left by your posts, searches, and online activity." },
  { q: "True or False: Public Wi-Fi is always just as safe as your home network.", type: "tf", options: ["True", "False"], correct: 1, diff: "Beginner",
    explain: "False — public Wi-Fi is often less secure, so avoid sensitive logins on it." },
  { q: "Smishing is phishing that happens over...", type: "mcq", options: ["Phone calls", "Text messages", "USB drives", "Printed mail"], correct: 1, diff: "Intermediate",
    explain: "Smishing = SMS + phishing, meaning phishing attempts sent via text message." },
  { q: "Which of these is the strongest password?", type: "mcq", options: ["password123", "YourName2010", "Tiger$Bicycle*Ocean42", "abcdef"], correct: 2, diff: "Intermediate",
    explain: "A long, unpredictable passphrase with mixed elements is much stronger than short or personal-info-based passwords." },
  { q: "True or False: If a caller says they're from tech support and asks for a one-time code, you should read it to them to fix the issue.", type: "tf", options: ["True", "False"], correct: 1, diff: "Intermediate",
    explain: "False — never share one-time codes with anyone, even someone claiming to be support staff. Hang up and verify independently." },
  { q: "What should you do if you find an unknown USB drive at school?", type: "scenario", options: ["Plug it into your laptop to see what's on it", "Turn it in to a teacher or IT staff without plugging it in", "Give it to a friend to test first", "Leave it exactly where it was"], correct: 1, diff: "Intermediate",
    explain: "Unknown USB drives can carry malware that runs automatically. Hand them to a trusted adult instead." },
  { q: "Ransomware typically...", type: "mcq", options: ["Speeds up your computer", "Locks or encrypts your files and demands payment", "Only affects printers", "Automatically backs up your files"], correct: 1, diff: "Intermediate",
    explain: "Ransomware locks your files and demands payment for their release — never pay, and always report it." },
  { q: "True or False: A website address like 'amaz0n-deals.com' pretending to be a well-known store is a safe way to shop.", type: "tf", options: ["True", "False"], correct: 1, diff: "Intermediate",
    explain: "False — slightly misspelled domains are a common fake-website trick. Always check the address carefully." },
  { q: "A friend's account messages you asking for a gift card code urgently. What's the best first step?", type: "scenario", options: ["Send it immediately since they're a friend", "Verify through another channel (call/text them directly) before doing anything", "Ignore it forever", "Post publicly asking if it's really them"], correct: 1, diff: "Intermediate",
    explain: "Verifying through a separate, trusted channel confirms whether the account is compromised before you act." },
  { q: "What is 'social engineering'?", type: "mcq", options: ["Building websites", "Manipulating people into giving up info or access", "A type of antivirus software", "Coding social media apps"], correct: 1, diff: "Challenge",
    explain: "Social engineering targets human trust and emotion rather than technical weaknesses." },
  { q: "True or False: DDoS attacks are something individuals should try if they're curious how they work, as long as it's just for a few minutes.", type: "tf", options: ["True", "False"], correct: 1, diff: "Challenge",
    explain: "False — participating in DDoS attacks is illegal and harmful, even 'just to try it.'" },
  { q: "Your account starts posting things you didn't write. What's the best immediate action?", type: "scenario", options: ["Wait a few days to see if it stops", "Change your password immediately and enable MFA", "Delete the app only", "Message the poster asking them to stop"], correct: 1, diff: "Challenge",
    explain: "Securing the account immediately — new password plus MFA — is the fastest way to regain control." },
  { q: "Which best describes a data breach?", type: "mcq", options: ["When you forget your password", "When a company's stored data is exposed or stolen", "When your Wi-Fi disconnects", "When you update your software"], correct: 1, diff: "Challenge",
    explain: "A data breach happens when an organization's systems are compromised and data is exposed, often through no fault of the user." },
  { q: "True or False: If your info was in a data breach, using a unique password for that account limits the damage to other accounts.", type: "tf", options: ["True", "False"], correct: 0, diff: "Challenge",
    explain: "True — unique passwords per account are exactly why one breach doesn't cascade into every account you own." },
];

const CHECKLIST = [
  "Use strong, unique passwords for each account",
  "Have multi-factor authentication (MFA) enabled",
  "Keep software and apps updated",
  "Avoid clicking suspicious links",
  "Check website addresses before entering info",
  "Keep personal information private online",
  "Use secure, trusted networks for sensitive logins",
  "Back up important files regularly",
  "Review account activity periodically",
  "Know how to report suspicious activity",
];

const TIPS = [
  "Think before you click.",
  "Never share passwords or one-time codes with anyone.",
  "Turn on multi-factor authentication wherever you can.",
  "Keep your devices and apps updated.",
  "Check a link's real destination before opening it.",
  "Be careful with how much information you share online.",
  "If it feels urgent or too good to be true, pause and verify.",
];

const BADGES = [
  { id: "b1", name: "Password Protector", icon: KeyRound, cond: (s) => s.completedLessons.includes("l4") },
  { id: "b2", name: "Phishing Spotter", icon: Radar, cond: (s) => Object.keys(s.spotAnswers).length === SPOT_ITEMS.length && SPOT_ITEMS.every(i => s.spotAnswers[i.id] === i.answer) },
  { id: "b3", name: "Privacy Guardian", icon: ShieldCheck, cond: (s) => s.checklist.every(Boolean) },
  { id: "b4", name: "Scam Detective", icon: Search, cond: (s) => Object.keys(s.scenarioAnswers).length === SCENARIOS.length },
  { id: "b5", name: "Cyber Guardian", icon: Award, cond: (s) => s.quizBest >= Math.ceil(QUIZ.length * 0.8) },
];

const LEVELS = [
  { min: 0, name: "Cyber Rookie", icon: "🛡️" },
  { min: 20, name: "Safety Scout", icon: "🔐" },
  { min: 45, name: "Threat Detective", icon: "🕵️" },
  { min: 70, name: "Cyber Guardian", icon: "⚡" },
  { min: 90, name: "Cyber Champion", icon: "🏆" },
];

const SEV_COLOR = { High: "#F87171", Medium: "#FBBF24", Low: "#34D399" };

/* ============================== HELPERS ============================== */

function levelFor(pct) {
  let cur = LEVELS[0];
  for (const l of LEVELS) if (pct >= l.min) cur = l;
  return cur;
}

/** Persists a piece of state to localStorage so progress survives reloads
 *  and app restarts once installed as a PWA. Falls back gracefully if
 *  localStorage is unavailable (e.g. private browsing). */
function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage unavailable — app still works, just without persistence
    }
  }, [key, value]);

  return [value, setValue];
}

/* ============================== UI PRIMITIVES ============================== */

function GlassCard({ children, style, className = "", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border ${className}`}
      style={{
        background: "rgba(255,255,255,0.045)",
        borderColor: "rgba(255,255,255,0.09)",
        backdropFilter: "blur(10px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ProgressBar({ pct, color = "#38BDF8" }) {
  return (
    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.min(100, Math.max(0, pct))}%`, background: `linear-gradient(90deg, ${color}, #A78BFA)` }}
      />
    </div>
  );
}

function Pill({ children, color }) {
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 rounded-full border"
      style={{ color, borderColor: color + "55", background: color + "14" }}
    >
      {children}
    </span>
  );
}

/* ============================== APP ============================== */

export default function App() {
  const [page, setPage] = useState("home");
  const [threatsTab, setThreatsTab] = useState("library");
  const [quizTab, setQuizTab] = useState("quiz");
  const [safetyTab, setSafetyTab] = useState("checklist");

  const [completedLessons, setCompletedLessons] = usePersistentState("cybershield:completedLessons", []);
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeThreat, setActiveThreat] = useState(null);

  const [spotAnswers, setSpotAnswers] = usePersistentState("cybershield:spotAnswers", {});
  const [spotIndex, setSpotIndex] = useState(0);

  const [scenarioAnswers, setScenarioAnswers] = usePersistentState("cybershield:scenarioAnswers", {});
  const [scenarioIndex, setScenarioIndex] = useState(0);

  const [checklist, setChecklist] = usePersistentState("cybershield:checklist", Array(CHECKLIST.length).fill(false));

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizBest, setQuizBest] = usePersistentState("cybershield:quizBest", 0);

  const [tipIndex, setTipIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTipIndex((i) => (i + 1) % TIPS.length), 8000);
    return () => clearInterval(t);
  }, []);

  const state = { completedLessons, spotAnswers, scenarioAnswers, checklist, quizBest };

  const lessonPct = (completedLessons.length / LESSONS.length) * 100;
  const checklistPct = (checklist.filter(Boolean).length / CHECKLIST.length) * 100;
  const quizPct = (quizBest / QUIZ.length) * 100;
  const overallPct = Math.round((lessonPct + checklistPct + quizPct) / 3);
  const level = levelFor(overallPct);

  const xp =
    completedLessons.length * 10 +
    checklist.filter(Boolean).length * 5 +
    Object.keys(scenarioAnswers).length * 10 +
    Object.keys(spotAnswers).length * 8 +
    Object.values(quizAnswers).length * 5;

  const earnedBadges = BADGES.filter((b) => b.cond(state));

  function toggleLessonComplete(id) {
    setCompletedLessons((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function answerSpot(itemId, val) {
    setSpotAnswers((prev) => ({ ...prev, [itemId]: val }));
  }

  function answerScenario(id, idx) {
    setScenarioAnswers((prev) => ({ ...prev, [id]: idx }));
  }

  function toggleChecklist(i) {
    setChecklist((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  function answerQuiz(idx) {
    if (quizAnswers[quizIndex] !== undefined) return;
    setQuizAnswers((prev) => ({ ...prev, [quizIndex]: idx }));
  }

  function nextQuiz() {
    if (quizIndex < QUIZ.length - 1) {
      setQuizIndex((i) => i + 1);
    } else {
      const score = QUIZ.reduce((acc, q, i) => acc + (quizAnswers[i] === q.correct ? 1 : 0), 0);
      setQuizBest((b) => Math.max(b, score));
      setQuizFinished(true);
    }
  }

  function resetQuiz() {
    setQuizIndex(0);
    setQuizAnswers({});
    setQuizFinished(false);
  }

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "learn", label: "Learn", icon: BookOpen },
    { id: "threats", label: "Threats", icon: AlertTriangle },
    { id: "quiz", label: "Quiz", icon: Radar },
    { id: "safety", label: "Safety", icon: ShieldCheck },
  ];

  return (
    <div
      className="min-h-screen w-full flex"
      style={{
        background: "radial-gradient(1200px 600px at 20% -10%, #1B1140 0%, #0B1020 55%, #080C18 100%)",
        color: "#E5E7EB",
        fontFamily: "'Inter', ui-sans-serif, system-ui",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 8px; }
        button:focus-visible, [tabindex]:focus-visible { outline: 2px solid #38BDF8; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
      `}</style>

      {/* Sidebar (desktop) */}
      <aside
        className="hidden md:flex flex-col w-60 shrink-0 border-r p-5 gap-1"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-2 mb-8 px-1">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#38BDF8,#A78BFA)" }}>
            <Shield size={20} color="#0B1020" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-display font-bold text-lg leading-tight">CyberShield</div>
            <div className="text-[11px] text-slate-400 font-mono">Learn. Detect. Protect.</div>
          </div>
        </div>
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => setPage(n.id)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{
              background: page === n.id ? "rgba(56,189,248,0.12)" : "transparent",
              color: page === n.id ? "#7DD3FC" : "#94A3B8",
            }}
          >
            <n.icon size={18} />
            {n.label}
          </button>
        ))}
        <div className="mt-auto px-1">
          <GlassCard style={{ padding: 14 }}>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Zap size={14} color="#FBBF24" /> XP
            </div>
            <div className="font-display font-bold text-xl">{xp}</div>
          </GlassCard>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center gap-2 px-4 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#38BDF8,#A78BFA)" }}>
            <Shield size={16} color="#0B1020" strokeWidth={2.5} />
          </div>
          <div className="font-display font-bold">CyberShield</div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 pb-24 md:pb-8 max-w-5xl w-full mx-auto">
          {page === "home" && (
            <HomePage
              overallPct={overallPct} level={level} xp={xp} completedLessons={completedLessons}
              quizBest={quizBest} tip={TIPS[tipIndex]} earnedBadges={earnedBadges}
              setPage={setPage}
            />
          )}
          {page === "learn" && (
            <LearnPage
              completedLessons={completedLessons} activeLesson={activeLesson}
              setActiveLesson={setActiveLesson} toggleLessonComplete={toggleLessonComplete}
            />
          )}
          {page === "threats" && (
            <ThreatsPage
              tab={threatsTab} setTab={setThreatsTab}
              activeThreat={activeThreat} setActiveThreat={setActiveThreat}
              spotAnswers={spotAnswers} answerSpot={answerSpot}
              spotIndex={spotIndex} setSpotIndex={setSpotIndex}
            />
          )}
          {page === "quiz" && (
            <QuizPage
              tab={quizTab} setTab={setQuizTab}
              quizIndex={quizIndex} quizAnswers={quizAnswers} answerQuiz={answerQuiz}
              nextQuiz={nextQuiz} quizFinished={quizFinished} resetQuiz={resetQuiz}
              scenarioIndex={scenarioIndex} setScenarioIndex={setScenarioIndex}
              scenarioAnswers={scenarioAnswers} answerScenario={answerScenario}
            />
          )}
          {page === "safety" && (
            <SafetyPage
              tab={safetyTab} setTab={setSafetyTab}
              checklist={checklist} toggleChecklist={toggleChecklist} checklistPct={checklistPct}
            />
          )}
        </main>
      </div>

      {/* Bottom nav (mobile) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center py-2 border-t"
        style={{ background: "rgba(11,16,32,0.92)", backdropFilter: "blur(12px)", borderColor: "rgba(255,255,255,0.08)" }}
      >
        {navItems.map((n) => (
          <button key={n.id} onClick={() => setPage(n.id)} className="flex flex-col items-center gap-1 px-2 py-1">
            <n.icon size={20} color={page === n.id ? "#7DD3FC" : "#64748B"} />
            <span className="text-[10px] font-medium" style={{ color: page === n.id ? "#7DD3FC" : "#64748B" }}>{n.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

/* ============================== HOME ============================== */

function HomePage({ overallPct, level, xp, completedLessons, quizBest, tip, earnedBadges, setPage }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-slate-400 text-sm">👋 Welcome back</div>
        <h1 className="font-display font-bold text-2xl md:text-3xl mt-1">Ready to level up your cyber safety?</h1>
      </div>

      <GlassCard style={{ padding: 24 }} className="relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full opacity-20" style={{ background: "radial-gradient(circle,#38BDF8,transparent 70%)" }} />
        <div className="flex flex-col md:flex-row md:items-center gap-6 relative">
          <div className="relative shrink-0 mx-auto md:mx-0" style={{ width: 128, height: 128 }}>
            <svg width="128" height="128" viewBox="0 0 128 128" className="-rotate-90">
              <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.08)" strokeWidth="12" fill="none" />
              <circle
                cx="64" cy="64" r="56" stroke="url(#grad)" strokeWidth="12" fill="none"
                strokeDasharray={2 * Math.PI * 56}
                strokeDashoffset={2 * Math.PI * 56 * (1 - overallPct / 100)}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display font-bold text-2xl">{overallPct}%</span>
              <span className="text-[10px] text-slate-400">Cyber Safety Score</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-3xl">{level.icon}</div>
            <div className="font-display font-bold text-xl mt-1">{level.name}</div>
            <p className="text-slate-400 text-sm mt-1">Keep learning, quizzing, and checking off your safety list to level up.</p>
            <button
              onClick={() => setPage("learn")}
              className="mt-4 px-5 py-2.5 rounded-xl font-semibold text-sm inline-flex items-center gap-2"
              style={{ background: "linear-gradient(135deg,#38BDF8,#A78BFA)", color: "#0B1020" }}
            >
              Continue Learning <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-3 gap-3">
        <StatCard icon={BookOpen} label="Lessons" value={`${completedLessons.length}/${LESSONS.length}`} color="#38BDF8" />
        <StatCard icon={Radar} label="Quiz score" value={`${quizBest}/${QUIZ.length}`} color="#A78BFA" />
        <StatCard icon={Zap} label="XP" value={xp} color="#FBBF24" />
      </div>

      <GlassCard style={{ padding: 18 }}>
        <div className="flex items-center gap-2 text-sm font-semibold mb-1">
          <Sparkles size={16} color="#FBBF24" /> Daily Cyber Tip
        </div>
        <p className="text-slate-300 text-sm">{tip}</p>
      </GlassCard>

      <div>
        <div className="text-sm font-semibold text-slate-300 mb-3">Quick access</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: "learn", label: "Learn", icon: BookOpen, color: "#38BDF8" },
            { id: "threats", label: "Threats", icon: AlertTriangle, color: "#F87171" },
            { id: "quiz", label: "Quiz", icon: Radar, color: "#A78BFA" },
            { id: "safety", label: "Checklist", icon: ShieldCheck, color: "#34D399" },
          ].map((q) => (
            <GlassCard key={q.id} onClick={() => setPage(q.id)} className="cursor-pointer hover:brightness-125 transition" style={{ padding: 16 }}>
              <q.icon size={20} color={q.color} />
              <div className="text-sm font-medium mt-2">{q.label}</div>
            </GlassCard>
          ))}
        </div>
      </div>

      {earnedBadges.length > 0 && (
        <div>
          <div className="text-sm font-semibold text-slate-300 mb-3">Your badges</div>
          <div className="flex flex-wrap gap-3">
            {earnedBadges.map((b) => (
              <GlassCard key={b.id} style={{ padding: "10px 14px" }} className="flex items-center gap-2">
                <b.icon size={16} color="#FBBF24" />
                <span className="text-xs font-medium">{b.name}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <GlassCard style={{ padding: 14 }}>
      <Icon size={18} color={color} />
      <div className="font-display font-bold text-lg mt-2">{value}</div>
      <div className="text-[11px] text-slate-400">{label}</div>
    </GlassCard>
  );
}

/* ============================== LEARN ============================== */

function LearnPage({ completedLessons, activeLesson, setActiveLesson, toggleLessonComplete }) {
  if (activeLesson) {
    const l = LESSONS.find((x) => x.id === activeLesson);
    const done = completedLessons.includes(l.id);
    return (
      <div className="flex flex-col gap-5 max-w-2xl">
        <button onClick={() => setActiveLesson(null)} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 w-fit">
          <ArrowLeft size={16} /> Back to lessons
        </button>
        <GlassCard style={{ padding: 24 }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(56,189,248,0.12)" }}>
            <l.icon size={22} color="#38BDF8" />
          </div>
          <h2 className="font-display font-bold text-xl mb-3">{l.title}</h2>
          <p className="text-slate-300 text-sm leading-relaxed">{l.body}</p>
          <div className="mt-5 p-3 rounded-xl text-sm" style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)" }}>
            <span className="font-semibold" style={{ color: "#34D399" }}>Key takeaway: </span>
            <span className="text-slate-300">{l.takeaway}</span>
          </div>
          <button
            onClick={() => toggleLessonComplete(l.id)}
            disabled={done}
            className="mt-6 px-5 py-2.5 rounded-xl font-semibold text-sm inline-flex items-center gap-2"
            style={{ background: done ? "rgba(52,211,153,0.15)" : "linear-gradient(135deg,#38BDF8,#A78BFA)", color: done ? "#34D399" : "#0B1020" }}
          >
            {done ? <><Check size={16} /> Completed</> : "Mark as complete"}
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-display font-bold text-2xl">Cybersecurity Basics</h1>
        <p className="text-slate-400 text-sm mt-1">{completedLessons.length} of {LESSONS.length} lessons completed</p>
        <div className="mt-2"><ProgressBar pct={(completedLessons.length / LESSONS.length) * 100} color="#38BDF8" /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {LESSONS.map((l) => {
          const done = completedLessons.includes(l.id);
          return (
            <GlassCard key={l.id} onClick={() => setActiveLesson(l.id)} className="cursor-pointer hover:brightness-125 transition" style={{ padding: 16 }}>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(56,189,248,0.12)" }}>
                  <l.icon size={18} color="#38BDF8" />
                </div>
                {done && <Check size={16} color="#34D399" />}
              </div>
              <div className="font-medium text-sm mt-3">{l.title}</div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

/* ============================== THREATS ============================== */

function ThreatsPage({ tab, setTab, activeThreat, setActiveThreat, spotAnswers, answerSpot, spotIndex, setSpotIndex }) {
  const [query, setQuery] = useState("");
  const filtered = THREATS.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));

  if (activeThreat) {
    const t = THREATS.find((x) => x.id === activeThreat);
    return (
      <div className="flex flex-col gap-5 max-w-2xl">
        <button onClick={() => setActiveThreat(null)} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 w-fit">
          <ArrowLeft size={16} /> Back to threats
        </button>
        <GlassCard style={{ padding: 24 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: SEV_COLOR[t.severity] + "1A" }}>
              <t.icon size={22} color={SEV_COLOR[t.severity]} />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl">{t.name}</h2>
              <Pill color={SEV_COLOR[t.severity]}>{t.severity} risk</Pill>
            </div>
          </div>

          <Section title="What is it?">{t.what}</Section>
          <Section title="Warning signs" list={t.signs} />
          <Section title="Example (fictional)">{t.example}</Section>
          <Section title="How to prevent it" list={t.prevent} color="#34D399" />
          <Section title="If you encounter it" list={t.whatToDo} color="#7DD3FC" />
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-display font-bold text-2xl">Threats</h1>
      <div className="flex gap-2">
        <TabButton active={tab === "library"} onClick={() => setTab("library")}>Threat Library</TabButton>
        <TabButton active={tab === "spot"} onClick={() => setTab("spot")}>Spot the Threat</TabButton>
      </div>

      {tab === "library" && (
        <>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search threats..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "#E5E7EB" }}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {filtered.map((t) => (
              <GlassCard key={t.id} onClick={() => setActiveThreat(t.id)} className="cursor-pointer hover:brightness-125 transition" style={{ padding: 16 }}>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: SEV_COLOR[t.severity] + "1A" }}>
                    <t.icon size={18} color={SEV_COLOR[t.severity]} />
                  </div>
                  <Pill color={SEV_COLOR[t.severity]}>{t.severity}</Pill>
                </div>
                <div className="font-medium text-sm mt-3">{t.name}</div>
              </GlassCard>
            ))}
          </div>
        </>
      )}

      {tab === "spot" && <SpotTheThreat spotAnswers={spotAnswers} answerSpot={answerSpot} spotIndex={spotIndex} setSpotIndex={setSpotIndex} />}
    </div>
  );
}

function Section({ title, children, list, color }) {
  return (
    <div className="mb-4">
      <div className="text-xs font-mono uppercase tracking-wide text-slate-500 mb-1.5">{title}</div>
      {children && <p className="text-slate-300 text-sm leading-relaxed">{children}</p>}
      {list && (
        <ul className="flex flex-col gap-1.5 mt-1">
          {list.map((item, i) => (
            <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color || "#94A3B8" }} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-xl text-sm font-medium"
      style={{ background: active ? "rgba(56,189,248,0.14)" : "rgba(255,255,255,0.04)", color: active ? "#7DD3FC" : "#94A3B8", border: "1px solid " + (active ? "rgba(56,189,248,0.3)" : "rgba(255,255,255,0.08)") }}
    >
      {children}
    </button>
  );
}

function SpotTheThreat({ spotAnswers, answerSpot, spotIndex, setSpotIndex }) {
  const item = SPOT_ITEMS[spotIndex];
  const answered = spotAnswers[item.id];
  const options = [
    { key: "safe", label: "Safe", color: "#34D399" },
    { key: "suspicious", label: "Suspicious", color: "#FBBF24" },
    { key: "dangerous", label: "Dangerous", color: "#F87171" },
  ];

  return (
    <GlassCard style={{ padding: 20 }} className="max-w-xl">
      <div className="text-xs text-slate-500 font-mono mb-2">Item {spotIndex + 1} of {SPOT_ITEMS.length}</div>
      <Pill color="#7DD3FC">{item.label}</Pill>
      <p className="text-slate-200 text-sm mt-3 leading-relaxed italic">{item.text}</p>

      <div className="grid grid-cols-3 gap-2 mt-5">
        {options.map((o) => {
          const isChosen = answered === o.key;
          const isCorrect = o.key === item.answer;
          const showState = answered !== undefined;
          return (
            <button
              key={o.key}
              disabled={answered !== undefined}
              onClick={() => answerSpot(item.id, o.key)}
              className="py-2.5 rounded-xl text-sm font-semibold"
              style={{
                background: showState ? (isCorrect ? o.color + "26" : isChosen ? "#F8717126" : "rgba(255,255,255,0.03)") : "rgba(255,255,255,0.05)",
                border: `1px solid ${showState && isCorrect ? o.color : showState && isChosen ? "#F87171" : "rgba(255,255,255,0.09)"}`,
                color: showState ? (isCorrect ? o.color : isChosen ? "#F87171" : "#64748B") : o.color,
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="mt-4 p-3 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {answered === item.answer ? "✅ Correct — " : "❌ Not quite — "}{item.reason}
        </div>
      )}

      <div className="flex justify-between mt-5">
        <button onClick={() => setSpotIndex((i) => Math.max(0, i - 1))} disabled={spotIndex === 0} className="text-sm text-slate-400 disabled:opacity-30 flex items-center gap-1">
          <ChevronLeft size={16} /> Prev
        </button>
        <button onClick={() => setSpotIndex((i) => Math.min(SPOT_ITEMS.length - 1, i + 1))} disabled={spotIndex === SPOT_ITEMS.length - 1} className="text-sm text-slate-400 disabled:opacity-30 flex items-center gap-1">
          Next <ChevronRight size={16} />
        </button>
      </div>
    </GlassCard>
  );
}

/* ============================== QUIZ ============================== */

function QuizPage(props) {
  const { tab, setTab } = props;
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-display font-bold text-2xl">Quiz</h1>
      <div className="flex gap-2">
        <TabButton active={tab === "quiz"} onClick={() => setTab("quiz")}>Cyber Quiz</TabButton>
        <TabButton active={tab === "scenarios"} onClick={() => setTab("scenarios")}>What Would You Do?</TabButton>
      </div>
      {tab === "quiz" ? <QuizRunner {...props} /> : <ScenarioRunner {...props} />}
    </div>
  );
}

function QuizRunner({ quizIndex, quizAnswers, answerQuiz, nextQuiz, quizFinished, resetQuiz }) {
  if (quizFinished) {
    const score = QUIZ.reduce((acc, q, i) => acc + (quizAnswers[i] === q.correct ? 1 : 0), 0);
    const pct = Math.round((score / QUIZ.length) * 100);
    const level = levelFor(pct);
    const weakAreas = QUIZ.filter((q, i) => quizAnswers[i] !== q.correct).map((q) => q.diff);
    const uniqueWeak = [...new Set(weakAreas)];
    return (
      <GlassCard style={{ padding: 28 }} className="text-center max-w-lg mx-auto">
        <div className="text-4xl">{level.icon}</div>
        <div className="font-display font-bold text-2xl mt-2">{level.name}</div>
        <div className="text-slate-400 text-sm mt-1">Quiz complete!</div>
        <div className="font-display font-bold text-4xl mt-5">{score}/{QUIZ.length}</div>
        <div className="text-slate-400 text-sm">{pct}% correct</div>
        {uniqueWeak.length > 0 && (
          <div className="mt-4 text-sm text-slate-300">
            Areas to review: <span className="font-medium">{uniqueWeak.join(", ")}</span>
          </div>
        )}
        <button
          onClick={resetQuiz}
          className="mt-6 px-5 py-2.5 rounded-xl font-semibold text-sm inline-flex items-center gap-2"
          style={{ background: "linear-gradient(135deg,#38BDF8,#A78BFA)", color: "#0B1020" }}
        >
          <RefreshCw size={16} /> Retake quiz
        </button>
      </GlassCard>
    );
  }

  const q = QUIZ[quizIndex];
  const answered = quizAnswers[quizIndex];

  return (
    <GlassCard style={{ padding: 22 }} className="max-w-xl">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-slate-500">Question {quizIndex + 1} of {QUIZ.length}</span>
        <Pill color={q.diff === "Beginner" ? "#34D399" : q.diff === "Intermediate" ? "#FBBF24" : "#F87171"}>{q.diff}</Pill>
      </div>
      <ProgressBar pct={(quizIndex / QUIZ.length) * 100} color="#A78BFA" />
      <p className="text-slate-100 font-medium mt-5 mb-4">{q.q}</p>
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => {
          const isChosen = answered === i;
          const isCorrect = i === q.correct;
          const show = answered !== undefined;
          return (
            <button
              key={i}
              disabled={show}
              onClick={() => answerQuiz(i)}
              className="text-left px-4 py-2.5 rounded-xl text-sm"
              style={{
                background: show ? (isCorrect ? "rgba(52,211,153,0.14)" : isChosen ? "rgba(248,113,113,0.14)" : "rgba(255,255,255,0.03)") : "rgba(255,255,255,0.05)",
                border: `1px solid ${show && isCorrect ? "#34D399" : show && isChosen ? "#F87171" : "rgba(255,255,255,0.09)"}`,
                color: "#E5E7EB",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {answered !== undefined && (
        <div className="mt-4 p-3 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {q.explain}
        </div>
      )}
      <button
        onClick={nextQuiz}
        disabled={answered === undefined}
        className="mt-5 px-5 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-30 inline-flex items-center gap-2"
        style={{ background: "linear-gradient(135deg,#38BDF8,#A78BFA)", color: "#0B1020" }}
      >
        {quizIndex === QUIZ.length - 1 ? "See results" : "Next question"} <ChevronRight size={16} />
      </button>
    </GlassCard>
  );
}

function ScenarioRunner({ scenarioIndex, setScenarioIndex, scenarioAnswers, answerScenario }) {
  const sc = SCENARIOS[scenarioIndex];
  const answered = scenarioAnswers[sc.id];

  return (
    <GlassCard style={{ padding: 22 }} className="max-w-xl">
      <div className="text-xs font-mono text-slate-500 mb-3">Scenario {scenarioIndex + 1} of {SCENARIOS.length}</div>
      <p className="text-slate-100 text-sm leading-relaxed italic">"{sc.situation}"</p>
      <div className="text-xs font-mono uppercase tracking-wide text-slate-500 mt-4 mb-2">What should you do?</div>
      <div className="flex flex-col gap-2">
        {sc.choices.map((c, i) => {
          const isChosen = answered === i;
          const isCorrect = i === sc.correct;
          const show = answered !== undefined;
          return (
            <button
              key={i}
              disabled={show}
              onClick={() => answerScenario(sc.id, i)}
              className="text-left px-4 py-2.5 rounded-xl text-sm"
              style={{
                background: show ? (isCorrect ? "rgba(52,211,153,0.14)" : isChosen ? "rgba(248,113,113,0.14)" : "rgba(255,255,255,0.03)") : "rgba(255,255,255,0.05)",
                border: `1px solid ${show && isCorrect ? "#34D399" : show && isChosen ? "#F87171" : "rgba(255,255,255,0.09)"}`,
                color: "#E5E7EB",
              }}
            >
              {c}
            </button>
          );
        })}
      </div>
      {answered !== undefined && (
        <div className="mt-4 p-3 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {sc.explain}
        </div>
      )}
      <div className="flex justify-between mt-5">
        <button onClick={() => setScenarioIndex((i) => Math.max(0, i - 1))} disabled={scenarioIndex === 0} className="text-sm text-slate-400 disabled:opacity-30 flex items-center gap-1">
          <ChevronLeft size={16} /> Prev
        </button>
        <button onClick={() => setScenarioIndex((i) => Math.min(SCENARIOS.length - 1, i + 1))} disabled={scenarioIndex === SCENARIOS.length - 1} className="text-sm text-slate-400 disabled:opacity-30 flex items-center gap-1">
          Next <ChevronRight size={16} />
        </button>
      </div>
    </GlassCard>
  );
}

/* ============================== SAFETY ============================== */

function SafetyPage({ tab, setTab, checklist, toggleChecklist, checklistPct }) {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-display font-bold text-2xl">Safety</h1>
      <div className="flex gap-2">
        <TabButton active={tab === "checklist"} onClick={() => setTab("checklist")}>Safety Checklist</TabButton>
        <TabButton active={tab === "help"} onClick={() => setTab("help")}>If Something Goes Wrong</TabButton>
      </div>

      {tab === "checklist" ? (
        <GlassCard style={{ padding: 22 }} className="max-w-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Your safety score</span>
            <span className="font-display font-bold" style={{ color: "#34D399" }}>{Math.round(checklistPct)}%</span>
          </div>
          <ProgressBar pct={checklistPct} color="#34D399" />
          <div className="flex flex-col gap-2 mt-5">
            {CHECKLIST.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleChecklist(i)}
                className="flex items-center gap-3 text-left px-3 py-2.5 rounded-xl text-sm"
                style={{ background: checklist[i] ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.03)", border: "1px solid " + (checklist[i] ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.08)") }}
              >
                <span
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                  style={{ background: checklist[i] ? "#34D399" : "transparent", border: checklist[i] ? "none" : "1.5px solid #475569" }}
                >
                  {checklist[i] && <Check size={13} color="#0B1020" strokeWidth={3} />}
                </span>
                <span style={{ color: checklist[i] ? "#E5E7EB" : "#94A3B8" }}>{item}</span>
              </button>
            ))}
          </div>
        </GlassCard>
      ) : (
        <EmergencyHelp />
      )}
    </div>
  );
}

const EMERGENCY_ITEMS = [
  { title: "You clicked a suspicious link", steps: ["Stop interacting with the page — close it", "Don't enter any information if a form appears", "Run a security scan on your device", "Tell a trusted adult or teacher"] },
  { title: "Your account may be compromised", steps: ["Change your password immediately from a different, trusted device", "Enable multi-factor authentication", "Review recent account activity", "Tell a trusted adult or the platform's support team"] },
  { title: "You shared sensitive information accidentally", steps: ["Tell a trusted adult right away", "Change any related passwords", "Monitor the account for unusual activity", "Report it to the platform if applicable"] },
  { title: "You downloaded something suspicious", steps: ["Don't open the file", "Delete it if possible", "Run a security scan", "Tell a trusted adult"] },
  { title: "You experience online harassment or scams", steps: ["Don't respond or engage", "Save evidence (screenshots)", "Report it on the platform", "Tell a trusted adult or teacher"] },
];

function EmergencyHelp() {
  return (
    <div className="flex flex-col gap-4 max-w-xl">
      <GlassCard style={{ padding: 18 }}>
        <div className="flex items-center gap-2 text-sm font-semibold mb-1">
          <LifeBuoy size={16} color="#F87171" /> Golden rules
        </div>
        <ul className="flex flex-col gap-1.5 mt-2 text-sm text-slate-300">
          <li>• Stop interacting with the suspicious content</li>
          <li>• Tell a trusted adult, teacher, or parent</li>
          <li>• Use the service's official account-security tools</li>
          <li>• Report the incident where appropriate</li>
          <li>• Never try to retaliate or "hack back"</li>
        </ul>
      </GlassCard>
      {EMERGENCY_ITEMS.map((e, i) => (
        <GlassCard key={i} style={{ padding: 18 }}>
          <div className="font-medium text-sm mb-2">{e.title}</div>
          <ul className="flex flex-col gap-1.5">
            {e.steps.map((s, j) => (
              <li key={j} className="text-sm text-slate-300 flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#7DD3FC" }} />
                {s}
              </li>
            ))}
          </ul>
        </GlassCard>
      ))}
    </div>
  );
}
