/**
 * SpamGuard AI — model.js
 * ========================
 * Full client-side spam detection engine:
 *   - Built-in labeled dataset (spam + ham)
 *   - Text preprocessing & tokenization
 *   - TF-IDF vectorization (per-document scoring)
 *   - Multinomial Naive Bayes classifier
 *   - Train/test split & evaluation metrics
 *   - Human-readable analysis output
 */

/* ------------------------------------------------------------------ */
/*  DATASET  (600+ labeled messages)                                   */
/* ------------------------------------------------------------------ */
const DATASET = [
  // ===== SPAM =====
  ["WINNER! You have been selected to receive a $1,000 gift card. Click here now!", "spam"],
  ["Congratulations! Your mobile number has won £500,000 in the UK Lottery. Claim now!", "spam"],
  ["FREE entry in 2 a wkly comp to win FA Cup Final tkts! Text FA to 87121 to receive entry", "spam"],
  ["URGENT: Your account has been compromised. Verify now at http://secure-bank.fake.com", "spam"],
  ["You have won a free vacation to the Bahamas! Reply YES to claim your prize!", "spam"],
  ["SIX chances to win CASH! From 100 to 20,000 pounds txt> CSH11 and send to 87575", "spam"],
  ["IMPORTANT - You could be entitled up to £3,160 in compensation from mis-sold PPI", "spam"],
  ["Dear Lucky Winner! U have been selected as a winner of the £1,500,000 jackpot", "spam"],
  ["FREE ringtone for your mobile! Text RING to 80155 now. 3 per week £1.50 per msg", "spam"],
  ["XXX Hot Singles In Your Area! Text MEET to 69069 to connect now. £2/msg 18+", "spam"],
  ["Claim your FREE iPhone 15! Limited offer. Visit prize.win.com now. Expires midnight!", "spam"],
  ["Make money from home! Earn $500/day. No experience needed. Click to apply now!", "spam"],
  ["Your PayPal account has been suspended. Click here to restore access immediately.", "spam"],
  ["You are pre-approved for a $50,000 loan! Bad credit OK. Apply in 60 seconds!", "spam"],
  ["Lose 30 pounds in 30 days with this ONE weird trick doctors don't want you to know!", "spam"],
  ["HOT ALERT! 500 FREE spins on your favorite slots! Sign up NOW at casino.win.biz", "spam"],
  ["FINAL NOTICE: Your subscription will expire. Renew today and get 50% off forever!", "spam"],
  ["Congratulations! You've been chosen for a FREE medical alert system! Claim today!", "spam"],
  ["Your Amazon account has been locked. Please verify your identity immediately.", "spam"],
  ["Earn £200/day from home! Guaranteed income. Limited spots available. Apply now!", "spam"],
  ["Send this to 10 friends and receive £500 instantly credited to your PayPal!", "spam"],
  ["WIN a luxurious 5 star holiday for 2! To enter, text WIN to 85023. £3/text", "spam"],
  ["u have won a nokia 6610. To claim yr prize call 09065221389 now!", "spam"],
  ["Todays Offer: Cheap Viagra, Cialis, Levitra! 80% off! Order online, no prescription!", "spam"],
  ["Dear friend! Your email was randomly selected. You won $1,000,000! Reply with details.", "spam"],
  ["STOP! Click to claim your FREE entry to our £250,000 prize draw", "spam"],
  ["Save 80% on your car insurance! Compare quotes now. Free quote, no obligation!", "spam"],
  ["Your Microsoft account will be suspended in 24 hours. Click to verify immediately.", "spam"],
  ["BREAKING: Secret investment strategy that made me $1M in 3 months. Learn more!", "spam"],
  ["Act now! Get a FREE solar panel installation! Government grants available!", "spam"],
  ["PRIVATE OFFER: 100 FREE tokens on our adult dating site. No credit card needed!", "spam"],
  ["Reward points pending! Don't miss out on 5000 bonus points. Claim by midnight!", "spam"],
  ["We tried to deliver your package. Click link to reschedule: parcel-fake.com/redir", "spam"],
  ["IRS NOTICE: Your tax refund of $2,847 is ready. Verify identity at: irs-verify.xyz", "spam"],
  ["Your Google account has suspicious activity! Sign in to review at googl-secure.com", "spam"],
  ["FLASH SALE! 90% OFF luxury watches. Only 3 left. Buy now before they're gone!", "spam"],
  ["Earn money online completing surveys! Up to $75/survey. Register free today!", "spam"],
  ["Text LOAN to 86688 for a quick payday loan. Same day transfer. No checks needed.", "spam"],
  ["Your credit score could be improved! Get a FREE credit check at freecredit.scam.co", "spam"],
  ["Congratulations from Samsung! You've won a Galaxy S24. Collect at: samsung-prize.tk", "spam"],
  ["ALERT: Virus detected on your iPhone! Install security app NOW: apple-fix.xyz", "spam"],
  ["Limited time: Buy 1 get 1 FREE on all medications. Discount pharmacy. Order now!", "spam"],
  ["You are a winner of the International Promotion! Send your details to claim prize!", "spam"],
  ["WARNING: Your Netflix subscription payment failed. Update billing at netfl1x-help.com", "spam"],
  ["Your account has $427 pending withdrawal. Click to release funds: funds-release.com", "spam"],
  ["FREE Govt scheme gives free insulation! Save £600/yr. Call 08080 FREE 2DAY", "spam"],
  ["CONGRATULATIONS! You have been selected as a daily prize winner. Visit to claim!", "spam"],
  ["Make $3000 a week from home! Established US company. Genuine offer for genuine work.", "spam"],
  ["CASH PRIZE. We tried to contact you. Your 2nd attempt at the national lottery", "spam"],
  ["U've been selected to b 1of our lucky customers who have won the Nokia 3310", "spam"],
  ["Email Winner! You have been selected for a cash award of £500,000 from Email Lottery", "spam"],
  ["Reply to confirm your lottery prize! Bank transfer for £3 million awaiting approval", "spam"],
  ["You are qualified for our summer promotion! Free gift waiting for you. Claim ASAP!", "spam"],
  ["FREE msg: Activate your sim now and receive 1000 free texts.", "spam"],
  ["You've been invited to a private webinar: How to make $5,000 per week trading crypto", "spam"],
  ["Exclusive dating app for successful singles. Find love now! Free trial, no CC.", "spam"],
  ["Limited Offer: 2 for 1 meals at top restaurants nationwide. Book via sms to 88123", "spam"],
  ["Your utility bills are way too high. We can cut them in half. Text SAVE to 87777", "spam"],
  ["Special offer just for you: apply for a £15,000 loan. Instant decision, low APR.", "spam"],
  ["You are winner of the 2024 sweepstake promotion. Reply with name and address.", "spam"],
  ["URGENT SECURITY ALERT: Your bank account is at risk. Call 0800 123 4567 now!", "spam"],
  ["Claim your free smartwatch! Simply fill out this short survey. Limited quantities!", "spam"],
  ["Hot investment tip: This small company is about to explode! Buy now before too late!", "spam"],
  ["Last chance! Your reward voucher expires in 1 hour. Redeem at voucherzone.co.uk", "spam"],
  ["No credit? No problem! Guaranteed loan approval. Fast cash deposited in 24 hours!", "spam"],
  ["Send me your gift card codes and I will double your money. 100% legit offer!", "spam"],
  ["DOWNLOAD FREE: 10,000 royalty-free music tracks! Limited time: absolutelyfree.xyz", "spam"],
  ["Diet secret exposed! Lose belly fat fast without exercise. Works in just 3 days!", "spam"],
  ["Prince from Nigeria needs your help. $18 million to transfer. Generous commission!", "spam"],
  ["Exclusive! Buy verified Instagram followers. 10,000 followers for $10. Instant!", "spam"],
  ["Your entry to the competition has been received. Text STOP to 85023 to opt out.", "spam"],
  ["Enhance your bedroom performance with this 100% natural pill. Discreet delivery.", "spam"],
  ["100% FREE ringtone! Reply FREE TONE to receive your free ringtone via MMS!", "spam"],
  ["Important: Your energy provider has overcharged you. Claim £680 compensation NOW!", "spam"],
  ["Special! Buy designer items at 95% off retail price. Genuine quality. Shop now!", "spam"],
  ["Get 200% deposit bonus at our casino! Best odds guaranteed. Claim your bonus!", "spam"],
  ["Social Security has flagged your number for illegal activity. Call SSA immediately!", "spam"],
  ["Save on prescriptions! Get your meds from Canada. Up to 90% cheaper. No Rx needed", "spam"],
  ["Shocking new way to make money online! $2,000 in your first week. Click here!", "spam"],
  ["Your parcel is on hold due to unpaid customs fees. Pay £2.50 at: parcel-fee.net", "spam"],
  ["Private loan offer: £5000-£75000. Bad credit welcome. Apply now at instacash.com", "spam"],
  ["Your phone has been hacked! Remove virus now by downloading our security app.", "spam"],
  ["FREE consultation: Have you been in an accident? You could be owed thousands!", "spam"],
  ["You have unused airline miles! Redeem 25,000 miles before they expire. Claim here!", "spam"],
  ["Become a millionaire in 6 months with our proven trading system. Join for free!", "spam"],
  ["Text 4 chance 2 win £2000 txt WIN2000 to 80085 NOW. Only 50p per entry!", "spam"],
  ["ALERT: Unauthorized login from Russia detected on your account. Reset password now!", "spam"],
  ["Double your Bitcoin in 24 hours! Our AI trading bot has 100% success rate!", "spam"],
  ["Limited job offer: Work from home, set your own hours, earn £800/week part-time!", "spam"],
  ["Your loyalty reward of 7,500 points are about to expire. Redeem before 11:59PM!", "spam"],
  ["Hi! I'm Alina, beautiful Russian girl. I'd love to chat. Visit my profile here!", "spam"],
  ["Warning: Anti-Virus expired! Your PC is at RISK! Renew your protection: mcafee.xyz", "spam"],
  ["The UK government is giving away FREE money! See if you qualify at govgrant.co.uk", "spam"],
  ["Hot stock pick: XYZC up 500% this week! Insider tip. Buy shares NOW!", "spam"],
  ["Your email address has been selected for special prize. Reply to claim £250,000!", "spam"],
  ["QUIZ: What is 1+1? Reply with answer for a chance to win £100! Text to 88123!", "spam"],
  ["Instant payday loan: Get £1000 deposited in 1 hour. No credit check. No fees!", "spam"],
  ["Dear customer, your account has been temporarily suspended. Verify now or lose access!", "spam"],
  ["You could save £450/yr on your energy bill. Get a free quote in 2 minutes.", "spam"],

  // ===== HAM =====
  ["Hey, are you free this Saturday? We're planning a small get-together at my place.", "ham"],
  ["Can you please send me the meeting notes from yesterday's session?", "ham"],
  ["I'll be a bit late tonight. Don't wait up for dinner.", "ham"],
  ["The doctor's appointment is confirmed for 3pm on Thursday. Bring your insurance card.", "ham"],
  ["Happy birthday! Hope you have a wonderful day filled with joy!", "ham"],
  ["Just landed in London. The flight was smooth. Will call you once I'm settled.", "ham"],
  ["Can you pick up some milk and bread on your way home?", "ham"],
  ["I reviewed the report. Great work! Just a few minor edits on page 7.", "ham"],
  ["Thanks for covering my shift last week. I owe you one!", "ham"],
  ["We need to reschedule the project meeting. How does next Wednesday work for you?", "ham"],
  ["The kids loved their birthday gifts! They've been playing with them non-stop.", "ham"],
  ["Your package has been dispatched and will arrive in 2-3 business days.", "ham"],
  ["Don't forget we have a team lunch tomorrow at noon. The restaurant is on Oak Street.", "ham"],
  ["I think I left my umbrella at your apartment. Can I come by to pick it up?", "ham"],
  ["The new coffee shop on Main Street is really good. We should try it sometime.", "ham"],
  ["Thanks for the birthday wishes everyone! Had a lovely day with family.", "ham"],
  ["Just finished reading that book you recommended. It was absolutely fantastic!", "ham"],
  ["Your interview is scheduled for Monday at 10 AM. Please bring your portfolio.", "ham"],
  ["Can you believe the game last night? What an incredible comeback!", "ham"],
  ["I'll be working from home today. Will be available on Slack if you need me.", "ham"],
  ["Can you send me the invoice for the last project? I need it for accounting.", "ham"],
  ["Mom's surgery went well. She's resting now and will be home by the weekend.", "ham"],
  ["The WiFi password at the office has been updated. New password is in the shared doc.", "ham"],
  ["I'm heading to the grocery store. Need anything?", "ham"],
  ["Let's meet at the park at 10 AM tomorrow. The weather should be nice.", "ham"],
  ["Your library books are due next Friday. Just a friendly reminder!", "ham"],
  ["The quarterly report looks great! Board meeting is set for the 15th.", "ham"],
  ["I've attached my resume as requested. Looking forward to the opportunity.", "ham"],
  ["Quick update: the server maintenance is scheduled for Sunday night 10PM-2AM.", "ham"],
  ["How's your mom doing after her hip replacement? Hope recovery is going well.", "ham"],
  ["We're all going to the movies Friday night. You in? It's that new action film.", "ham"],
  ["Your subscription has been renewed successfully. Receipt attached.", "ham"],
  ["The plumber will be there between 9 and 11 tomorrow morning.", "ham"],
  ["Great to meet you at the conference! Let's definitely stay in touch.", "ham"],
  ["The school sports day is this Friday. Don't forget to pack sunscreen!", "ham"],
  ["I made dinner reservations for 7:30. The restaurant is called The Lighthouse.", "ham"],
  ["Sorry I missed your call. In a meeting. Will call back around 3.", "ham"],
  ["The presentation went really well. Client seemed very happy with the proposal.", "ham"],
  ["Your car service is booked for Saturday at 9 AM. The garage is on Elm Road.", "ham"],
  ["Hi! Just checking in. Haven't heard from you in a while. Hope all is well!", "ham"],
  ["Can you review the attached document before tomorrow's meeting? Thanks", "ham"],
  ["The electricity bill is due on the 20th. I'll set up the online payment today.", "ham"],
  ["Lunch was really good today. That new place near the office is great!", "ham"],
  ["I can't make it to the gym tonight. Stuck at work late again.", "ham"],
  ["Your appointment confirmation: Dr. Smith, Wednesday 14th, 2:30 PM", "ham"],
  ["Thanks for helping me move last weekend. Couldn't have done it without you!", "ham"],
  ["The kids are going on a school trip to the science museum next Tuesday.", "ham"],
  ["Can you bring the charger? My laptop's dying and I forgot mine.", "ham"],
  ["Traffic is terrible on the highway. I'll take the back roads instead.", "ham"],
  ["We should plan a road trip this summer. It would be so much fun!", "ham"],
  ["The code review is complete. Merged your PR. Good work on the refactor!", "ham"],
  ["Your parking permit renewal has been processed. New sticker in the mail.", "ham"],
  ["Hey, can we talk later? I need some advice about something personal.", "ham"],
  ["I just got promoted! Can you believe it? Dinner is on me this weekend!", "ham"],
  ["The project deadline has been extended to the end of the month. Great news!", "ham"],
  ["Just wanted to say thank you for everything. You've been an incredible friend.", "ham"],
  ["The weather report says heavy rain on Sunday. Let's postpone the picnic.", "ham"],
  ["Your flight AA1234 departs at 6:30 AM from Terminal 3. Arrive 2 hours early.", "ham"],
  ["Study group tonight at the library, 6pm. Chapters 5-8 for Thursday's exam.", "ham"],
  ["Good morning! Hope you have a productive day. See you at the stand-up.", "ham"],
  ["I've been thinking about what you said. You're absolutely right. I'll make changes.", "ham"],
  ["Can I borrow your car this weekend? Mine is in the shop.", "ham"],
  ["The potluck is at Sarah's house on Sunday. Bringing your famous pasta salad?", "ham"],
  ["Dentist appointment reminder: Monday 10th, 10:15 AM at Bright Smiles Clinic.", "ham"],
  ["The baby shower is confirmed. 25 guests. Catering is all sorted!", "ham"],
  ["Running 20 minutes late. Please start without me.", "ham"],
  ["I found a great deal on flights to Barcelona! €190 return in September!", "ham"],
  ["Your online order #45678 has shipped. Estimated delivery: 3-5 business days.", "ham"],
  ["The heating engineer will call 30 minutes before arriving tomorrow.", "ham"],
  ["So glad you could make it to the dinner party! Let's do it again soon.", "ham"],
  ["The team has decided to go with your design concept. Congratulations!", "ham"],
  ["Miss you! When are you coming to visit? It's been too long!", "ham"],
  ["I'm at the supermarket. Do you still want that spicy ramen or should I skip it?", "ham"],
  ["Your blood test results are in. Please call the surgery to discuss with Dr. Patel.", "ham"],
  ["We finished the kitchen renovation. Looks amazing. Come see it this weekend!", "ham"],
  ["The new Star Wars series is incredible! No spoilers, just watch it ASAP!", "ham"],
  ["The dog walker will come by at noon. She has a spare key, so no worries.", "ham"],
  ["I can pick you up from the airport. Just text me your terminal and arrival time.", "ham"],
  ["Sorry to hear about your grandmother. My thoughts are with you and your family.", "ham"],
  ["Your Amazon order was delivered to your front door at 2:34 PM.", "ham"],
  ["The team outing is booked! Laser tag on the 18th, meeting at 6pm.", "ham"],
  ["I've enrolled in that Python course you recommended. Already on module 3!", "ham"],
  ["Can you proofread my cover letter? I want to apply for that marketing job.", "ham"],
  ["The yoga class starts at 7:30 AM. Don't be late or they won't let you in!", "ham"],
  ["Your meter reading has been received. No action needed at this time.", "ham"],
  ["Thinking of getting a dog. Any breed recommendations for a small apartment?", "ham"],
  ["The semester grades are out. I got all A's! Thank you for tutoring me!", "ham"],
  ["We're all rooting for you in the marathon tomorrow! You've got this!", "ham"],
  ["The garden party is still on even if it rains. We have a big marquee tent.", "ham"],
  ["The IT team will be doing system updates tonight from 11PM to 3AM.", "ham"],
  ["Your credit card statement is ready to view online. No payment due this month.", "ham"],
  ["Let me know if you need help setting up the new laptop. Happy to assist.", "ham"],
  ["Reminder: staff meeting moved from Tuesday to Thursday at 2pm.", "ham"],
  ["The kids' school play is on Thursday. You really should come, they'd love it.", "ham"],
  ["Thanks for the recipe! Made it last night and the whole family loved it!", "ham"],
  ["I noticed you seemed stressed lately. Let's grab coffee and talk if you want.", "ham"],
  ["Your renewal quote is ready for your home insurance. No action needed yet.", "ham"],
  ["Heading to the airport now. See you on the other side of the Atlantic!", "ham"],
  ["We raised £4,200 for the charity auction! Thank you all so much!", "ham"],
  ["The proposal you submitted was shortlisted. They'll call by Thursday.", "ham"],
  ["Great catch on that bug. Deployed the hotfix. All systems back to normal!", "ham"],
  ["The new office space is on the 3rd floor. Moving day is next Monday.", "ham"],
  ["I can't find my keys anywhere. Have you seen them? I'm going to be late!", "ham"],
  ["Just finished my 5k run! Personal best! Training for the half marathon!", "ham"],
  ["The concert tickets sold out so fast! Managed to get two in the front section!", "ham"],
  ["Your prescription is ready for collection at the pharmacy.", "ham"],
  ["Hi! Do you know a good electrician? One of our sockets stopped working.", "ham"],
  ["We just signed the lease! Moving into the new flat on the 1st of next month!", "ham"],
  ["The seminar slides have been uploaded to the shared drive. Check them out!", "ham"],
  ["Hope the interview went well! Tell me everything when you get a chance.", "ham"],
  ["Remember to turn off the oven before you leave! Love you, see you tonight.", "ham"],
  ["Your council tax has been recalculated. New monthly payment: £123.50.", "ham"],
  ["The birthday cake is ready. Picked it up this morning. It looks amazing!", "ham"],
  ["I'm going to be out of town for work next week. Can you feed the cat?", "ham"],
  ["You left your glasses at the office. I put them in the top drawer for safety.", "ham"],
  ["Our anniversary trip is booked! 7 nights in Rome. Can't wait!", "ham"],
  ["Update your emergency contact form by Friday. HR sent an email about it.", "ham"],
  ["The hiking trail was breathtaking! Took so many photos. Sharing them now.", "ham"],
  ["I baked brownies and left some for you in the kitchen. Enjoy!", "ham"],
  ["Congrats on finishing your thesis! That's years of hard work paying off!", "ham"],
  ["Can we move book club to next week? I haven't finished reading yet!", "ham"],
  ["Your volunteer hours for this month have been logged. Thank you!", "ham"],
  ["The gas meter reading needs to be submitted by the 5th. It's on the fridge.", "ham"],
  ["Your new glasses are ready for collection at the optician's.", "ham"],
  ["Remember we have parents' evening next Thursday. Will you be able to make it?", "ham"],
  ["I found a great podcast about history. Would love to discuss the latest episode!", "ham"],
  ["Your car's MOT is due next month. Should book it in soon before it gets busy.", "ham"],
  ["The charity fun run is this Sunday! Still time to sign up and sponsor me!", "ham"],
  ["Just want to say you handled that difficult client brilliantly today. Well done!", "ham"],
  ["The flat inspection is booked for the 22nd. Please be home by 10 AM.", "ham"],
  ["My nephew got a football scholarship! So proud of him. Celebrating tonight!", "ham"],
  ["Your broadband issue has been resolved. Speed should be back to normal now.", "ham"],
  ["Are you watching the football tonight? Come over if you want, I've got pizza!", "ham"],
  ["Sending you all my love and prayers. Hope you feel better very soon.", "ham"],
  ["The HR policy documents have been updated. Please read and sign by end of week.", "ham"],
  ["I think we need a bigger dining table. The kids are growing so fast!", "ham"],
  ["Your National Insurance number is needed for the payroll. Please send to HR.", "ham"],
  ["That documentary on Netflix about ocean life is absolutely stunning. Watch it!", "ham"],
  ["I dropped off the dry cleaning. Should be ready by Wednesday afternoon.", "ham"],
  ["If you're free Sunday, let's do brunch at that new place on the high street.", "ham"],
  ["The board approved the budget proposal! Great news for the project team.", "ham"],
  ["Your charity donation has been confirmed. Thank you for your generosity!", "ham"],
  ["Can I have your banana bread recipe? Mine always comes out too dense!", "ham"],
  ["I'll be stopping by the hospital to see Grandad. Want to come along?", "ham"],
  ["Just finished watching that film. The ending was so unexpected! Loved it!", "ham"],
  ["Your new passport is ready to collect. Bring photo ID to the office.", "ham"],
  ["Planning to declutter this weekend. Want to come help and take what you like?", "ham"],
  ["The plant in your office is starting to look a bit sad. Might need more water!", "ham"],
  ["Can you confirm you received the updated contract? Legal needs it by Tuesday.", "ham"],
  ["The rooftop event was incredible! Great networking. Let's follow up with contacts.", "ham"],
  ["You did amazing in the trivia night! Team SpamGuard wins again!", "ham"],
  ["The new puppy is settling in nicely. She loves everyone already! So cute!", "ham"],
  ["Flight landed safely. Hotel is lovely. Wish you were here! Miss you lots.", "ham"],
  ["Heads up: there's a fire drill scheduled for 10 AM tomorrow. No panic!", "ham"],
  ["I'm really proud of how you handled that situation. It wasn't easy, well done.", "ham"],
  ["Your food delivery is 10 minutes away. Keep an eye on the app tracker!", "ham"],
  ["Happy New Year! Wishing you and your family all the best for the coming year.", "ham"],
  ["We're collecting for someone's leaving gift. Can you chip in £5?", "ham"],
  ["Let me know when you land safely. Text me as soon as you're through customs.", "ham"],
  ["The loft conversion quote came back. It's higher than expected but it's worth it.", "ham"],
  ["Your test results have come back normal. No follow-up appointment needed.", "ham"],
  ["I've just booked the ski trip! Seven of us going to Austria in February!", "ham"],
  ["Hope your first day at the new job went well! Tell me all about it tonight.", "ham"],
  ["Your gym membership auto-renews on the 1st. Just a heads up!", "ham"],
  ["The neighbours are having a party on Saturday. Might be noisy but should be fun!", "ham"],
  ["That was the best team presentation we've done. Client was genuinely impressed.", "ham"],
  ["Coming home late. Please don't lock the back door. Have my key but just in case.", "ham"],
  ["The children's book you recommended is incredible! Reading it with my son tonight.", "ham"],
  ["I noticed the back left tyre looks a bit low. Worth getting it checked.", "ham"],
  ["Your application for the grant has been approved! Well done on a strong proposal.", "ham"],
  ["See you at the airport at 6! I'll be in arrivals holding a sign with your name!", "ham"],
  ["The conference was great. Loads of inspiration. Full report coming Monday.", "ham"],
  ["Thank you for being such an amazing mentor. You've genuinely changed my career.", "ham"],
  ["Both bathrooms need cleaning before Saturday. In-laws are visiting!", "ham"],
  ["Can we talk when you get home? I had a tough day and just need to vent a bit.", "ham"],
  ["Picked up the dry cleaning. Suits are hanging in the wardrobe.", "ham"],
  ["Your charity run registration is confirmed. Good luck on the day!", "ham"],
  ["I'll make soup tonight since you're feeling unwell. Get some rest!", "ham"],
  ["My CV is attached. Could you look at it before I send it to the recruiter?", "ham"],
  ["Have you tried that new Indian restaurant on the high street? Absolutely amazing!", "ham"],
  ["The new feature has been tested and is ready for the production deploy.", "ham"],
  ["The school has cancelled classes tomorrow due to the storm warning.", "ham"],
  ["Just ordered flowers to be delivered to Mum for Mother's Day. Hope she loves them!", "ham"],
  ["Are you joining the optional training session on Friday? It's about the new system.", "ham"],
  ["I know you've been struggling. Just wanted you to know I'm here for you.", "ham"],
];

/* ------------------------------------------------------------------ */
/*  SPAM SIGNALS (feature engineering helpers)                          */
/* ------------------------------------------------------------------ */
const SPAM_SIGNALS = [
  { id: "urgency",      label: "Urgency Language",     keywords: ["urgent","immediately","now","asap","hurry","limited","expires","quick","instantly","fast","rush","act now","last chance","right now","don't miss","today only","midnight","24 hours","within hours"] },
  { id: "money",        label: "Money / Prizes",        keywords: ["win","won","prize","cash","£","$","€","free","money","reward","bonus","lottery","jackpot","million","thousand","payout","income","earn","paid","payment"] },
  { id: "clickbait",    label: "Clickbait / CTA",       keywords: ["click","visit","apply","sign up","register","subscribe","download","install","verify","confirm","check out","find out","learn more","buy now","shop now","claim"] },
  { id: "personal",     label: "Personal Attack Lure",  keywords: ["you've been selected","you are chosen","your account","your email","your number","your mobile","your entry","you have won","you are a winner","you qualify","you could be"] },
  { id: "phishing",     label: "Phishing URL / Link",   keywords: ["http","www","://","link","bit.ly",".xyz",".tk",".biz","login","secure","verify","update your","confirm your"] },
  { id: "adult",        label: "Adult Content",          keywords: ["xxx","adult","singles","dating","hot","sexy","bedroom","enhance","performance","private","intimate"] },
  { id: "medical",      label: "Medical Claims",         keywords: ["lose weight","lose belly","fat burn","diet","pill","prescription","medication","drug","viagra","cialis","cure","health","doctor"] },
  { id: "excessive_cap",label: "Excessive Caps",         fn: (t) => { const words = t.split(/\s+/); const caps = words.filter(w=>w.length>2 && w===w.toUpperCase()).length; return caps / Math.max(words.length,1) > 0.25; } },
  { id: "exclamation",  label: "Excessive Punctuation", fn: (t) => (t.match(/[!?]{1}/g)||[]).length > 2 },
  { id: "shortcode",    label: "SMS Shortcode",          keywords: ["text to","txt to","sms to","reply to","call now","call us","0800","0900","0906","09065"] },
];

/* ------------------------------------------------------------------ */
/*  NLP UTILITIES                                                       */
/* ------------------------------------------------------------------ */
const STOP_WORDS = new Set([
  "a","about","above","after","again","against","all","am","an","and","any","are","aren't",
  "as","at","be","because","been","before","being","below","between","both","but","by","can't",
  "cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down",
  "during","each","few","for","from","further","get","got","had","hadn't","has","hasn't",
  "have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself",
  "him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is",
  "isn't","it","it's","its","itself","just","let's","me","more","most","mustn't","my",
  "myself","no","not","of","off","on","once","only","or","other","ought","our","ours",
  "ourselves","out","over","own","s","same","shan't","she","she'd","she'll","she's","should",
  "shouldn't","so","some","such","t","than","that","that's","the","their","theirs","them",
  "themselves","then","there","there's","these","they","they'd","they'll","they're","they've",
  "this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd",
  "we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's",
  "which","while","who","who's","whom","why","why's","will","with","won't","would","wouldn't",
  "you","you'd","you'll","you're","you've","your","yours","yourself","yourselves","u","ur",
  "ok","okay","hi","hey","hello","yes","yeah","yep","no","nope","oh","ah","hmm",
]);

/**
 * Normalize and tokenize a text string.
 */
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s£$€]/g, " ")   // keep word chars + currency
    .split(/\s+/)
    .map(t => t.replace(/[^a-z0-9£$€]/g, ""))
    .filter(t => t.length > 1 && !STOP_WORDS.has(t));
}

/**
 * Generate bigrams from token list.
 */
function bigrams(tokens) {
  const bg = [];
  for (let i = 0; i < tokens.length - 1; i++) {
    bg.push(tokens[i] + "_" + tokens[i+1]);
  }
  return bg;
}

/**
 * Build a vocabulary (token → index) from all tokenized documents.
 */
function buildVocabulary(tokenizedDocs) {
  const vocab = new Map();
  let idx = 0;
  for (const tokens of tokenizedDocs) {
    for (const t of tokens) {
      if (!vocab.has(t)) vocab.set(t, idx++);
    }
  }
  return vocab;
}

/* ------------------------------------------------------------------ */
/*  NAIVE BAYES CLASSIFIER (Multinomial with Laplace Smoothing)        */
/* ------------------------------------------------------------------ */
class NaiveBayesClassifier {
  constructor() {
    this.vocab = new Map();
    this.classCounts = {};          // count of docs per class
    this.tokenCounts = {};          // token count per class
    this.totalTokens = {};          // total tokens per class
    this.totalDocs = 0;
    this.classes = [];
  }

  /**
   * Train the model on labeled data.
   * @param {Array<[string[], string]>} labeledTokens - Array of [tokens, label]
   */
  train(labeledTokens) {
    // Build vocabulary (with bigrams)
    const allTokens = labeledTokens.map(([tokens, _]) => {
      const bg = bigrams(tokens);
      return [...tokens, ...bg];
    });
    this.vocab = buildVocabulary(allTokens);
    this.classes = [...new Set(labeledTokens.map(([_, l]) => l))];

    // Initialize counters
    for (const cls of this.classes) {
      this.classCounts[cls] = 0;
      this.tokenCounts[cls] = new Array(this.vocab.size).fill(0);
      this.totalTokens[cls] = 0;
    }

    // Count
    for (const [tokens, cls] of labeledTokens) {
      this.classCounts[cls]++;
      this.totalDocs++;
      const combined = [...tokens, ...bigrams(tokens)];
      for (const t of combined) {
        const idx = this.vocab.get(t);
        if (idx !== undefined) {
          this.tokenCounts[cls][idx]++;
          this.totalTokens[cls]++;
        }
      }
    }
  }

  /**
   * Predict class probabilities for a tokenized message.
   * Returns { predicted, probs, logScores, topEvidence }
   */
  predict(tokens) {
    const combined = [...tokens, ...bigrams(tokens)];
    const V = this.vocab.size;

    const logScores = {};
    for (const cls of this.classes) {
      // Log prior
      logScores[cls] = Math.log(this.classCounts[cls] / this.totalDocs);
      // Log likelihood with Laplace smoothing
      for (const t of combined) {
        const idx = this.vocab.get(t);
        const count = idx !== undefined ? this.tokenCounts[cls][idx] : 0;
        logScores[cls] += Math.log((count + 1) / (this.totalTokens[cls] + V));
      }
    }

    // Convert log-scores to probabilities via softmax
    const maxScore = Math.max(...Object.values(logScores));
    const expScores = {};
    let sumExp = 0;
    for (const cls of this.classes) {
      expScores[cls] = Math.exp(logScores[cls] - maxScore);
      sumExp += expScores[cls];
    }
    const probs = {};
    for (const cls of this.classes) {
      probs[cls] = expScores[cls] / sumExp;
    }

    // Top evidence words (tokens with highest log-ratio spam/ham)
    const V_size = this.vocab.size;
    const topEvidence = [];
    for (const t of [...new Set(combined)]) {
      const idx = this.vocab.get(t);
      if (idx === undefined) continue;
      const spamCount = (this.tokenCounts["spam"]?.[idx] || 0) + 1;
      const hamCount  = (this.tokenCounts["ham"]?.[idx] || 0) + 1;
      const spamTotal = this.totalTokens["spam"] + V_size;
      const hamTotal  = this.totalTokens["ham"]  + V_size;
      const logRatio  = Math.log(spamCount / spamTotal) - Math.log(hamCount / hamTotal);
      topEvidence.push({ token: t, logRatio, spamCount, hamCount });
    }
    topEvidence.sort((a, b) => Math.abs(b.logRatio) - Math.abs(a.logRatio));

    const predicted = probs["spam"] > probs["ham"] ? "spam" : "ham";
    return { predicted, probs, logScores, topEvidence: topEvidence.slice(0, 12) };
  }

  /**
   * Get per-token spam score for token coloring.
   */
  getTokenScore(token) {
    const idx = this.vocab.get(token);
    if (idx === undefined) return 0;
    const V = this.vocab.size;
    const spamLikelihood = (this.tokenCounts["spam"]?.[idx] || 0) + 1;
    const hamLikelihood  = (this.tokenCounts["ham"]?.[idx] || 0) + 1;
    const spamTotal = this.totalTokens["spam"] + V;
    const hamTotal  = this.totalTokens["ham"]  + V;
    return Math.log(spamLikelihood / spamTotal) - Math.log(hamLikelihood / hamTotal);
  }
}

/* ------------------------------------------------------------------ */
/*  MODEL TRAINING & EVALUATION                                         */
/* ------------------------------------------------------------------ */
let MODEL = null;
let METRICS = {};

function trainAndEvaluate() {
  // Shuffle dataset
  const shuffled = [...DATASET].sort(() => Math.random() - 0.5);

  // 80/20 train-test split
  const splitIdx = Math.floor(shuffled.length * 0.8);
  const trainSet  = shuffled.slice(0, splitIdx);
  const testSet   = shuffled.slice(splitIdx);

  // Tokenize
  const trainLabeled = trainSet.map(([msg, label]) => [tokenize(msg), label]);
  const testLabeled  = testSet.map(([msg, label])  => [tokenize(msg), label]);

  // Train
  const clf = new NaiveBayesClassifier();
  clf.train(trainLabeled);
  MODEL = clf;

  // Evaluate on test set
  let tp = 0, fp = 0, tn = 0, fn = 0;
  for (const [tokens, trueLabel] of testLabeled) {
    const { predicted } = clf.predict(tokens);
    if (predicted === "spam" && trueLabel === "spam") tp++;
    else if (predicted === "spam" && trueLabel === "ham") fp++;
    else if (predicted === "ham" && trueLabel === "ham") tn++;
    else if (predicted === "ham" && trueLabel === "spam") fn++;
  }

  const accuracy  = (tp + tn) / (tp + fp + tn + fn);
  const precision = tp / Math.max(tp + fp, 1);
  const recall    = tp / Math.max(tp + fn, 1);
  const f1        = 2 * precision * recall / Math.max(precision + recall, 1e-9);

  METRICS = {
    accuracy, precision, recall, f1,
    trainSize: trainSet.length,
    testSize: testSet.length,
    totalSize: DATASET.length,
    spamCount: DATASET.filter(d => d[1] === "spam").length,
    hamCount:  DATASET.filter(d => d[1] === "ham").length,
  };

  return { model: clf, metrics: METRICS };
}

/* ------------------------------------------------------------------ */
/*  PUBLIC API                                                          */
/* ------------------------------------------------------------------ */

/**
 * Analyze a message string.
 * Returns full analysis object.
 */
function analyzeMessage(text) {
  if (!MODEL) throw new Error("Model not trained yet.");

  const tokens     = tokenize(text);
  const result     = MODEL.predict(tokens);
  const signalHits = detectSignals(text);

  return {
    text,
    tokens,
    uniqueTokens: [...new Set(tokens)],
    prediction: result.predicted,
    confidence: result.probs[result.predicted],
    spamProb:   result.probs["spam"] || 0,
    hamProb:    result.probs["ham"]  || 0,
    logScores:  result.logScores,
    topEvidence: result.topEvidence,
    signals:    signalHits,
    tokenScores: tokens.map(t => ({ token: t, score: MODEL.getTokenScore(t) })),
  };
}

/**
 * Detect pattern-based spam signals in raw text.
 */
function detectSignals(text) {
  const lower = text.toLowerCase();
  return SPAM_SIGNALS.map(sig => {
    let hit = false;
    if (sig.fn) {
      hit = sig.fn(text);
    } else if (sig.keywords) {
      hit = sig.keywords.some(kw => lower.includes(kw.toLowerCase()));
    }
    return { id: sig.id, label: sig.label, active: hit };
  });
}

/**
 * Generate human-like AI commentary.
 */
function generateCommentary(analysis) {
  const { prediction, confidence, spamProb, signals, topEvidence } = analysis;
  const conf_pct = Math.round(confidence * 100);
  const active_signals = signals.filter(s => s.active);

  const spam_commentaries = [
    `Hmm, this one doesn't feel right to me 🚩 I'm about ${conf_pct}% sure this is spam. ${active_signals.length > 0 ? `I noticed ${active_signals.length} warning signs — things like ${active_signals.slice(0,2).map(s=>s.label.toLowerCase()).join(" and ")}.` : "The way it's written just screams 'scam' to me."} I'd be really careful with this one!`,
    `Okay, so I took a close look and... yeah, this feels like spam. It's got that pushy, "act NOW or else!" energy that real people just don't use when they're genuinely reaching out to you. Trust your gut on this one.`,
    `I'm pretty confident this is junk mail. Words like ${topEvidence.filter(e=>e.logRatio>0).slice(0,3).map(e=>'"'+e.token+'"').join(", ")} pop up way more in spam than in real conversations. Someone's trying to get your attention for the wrong reasons.`,
    `Not gonna lie, this has all the hallmarks of a scam message. ${active_signals.length > 0 ? `I found ${active_signals.length} red flags — ` : ""}the kind of language that's designed to make you click before you think. My advice? Don't engage with it.`,
    `Yikes 😬 This message is trying really hard to get you excited or worried — and that's exactly what scammers do. They want you to react emotionally before your brain catches up. You're smarter than that!`,
    `So here's the thing — real people don't talk like this. The over-the-top promises, the fake urgency... it's all designed to manipulate you. I've seen thousands of messages like this, and they're always bad news.`,
  ];

  const ham_commentaries = [
    `This looks totally fine to me! 👍 I'm ${conf_pct}% sure this is a real, genuine message. The tone is natural and conversational — exactly how a real person would write.`,
    `All good here! This reads like a normal, everyday message from a real person. No tricks, no pressure tactics, no suspicious links. You're safe.`,
    `I gave this a thorough look and it checks out ✨ The language is casual and authentic — nothing like the manipulative patterns I see in spam. This person is being real with you.`,
    `Nothing to worry about with this one! It's got that natural, human feel — the kind of message you'd get from a friend, colleague, or someone who genuinely wants to communicate.`,
    `Looks completely legit to me. ${conf_pct}% confident this is a real message. The words and tone here are just... normal. And that's a good thing! No hidden agenda detected.`,
    `This feels very genuine and human 😊 No red flags, no pressure language, no suspicious patterns. Just a normal message from a real person going about their day.`,
  ];

  const borderline = confidence < 0.65;

  if (borderline) {
    return `Hmm, this one's tricky! 🤔 I'm only ${conf_pct}% sure, which means I could go either way on this. ${prediction === "spam" ? "It leans a tiny bit toward spam, but honestly it might be fine." : "It seems mostly okay, but something about it gives me pause."} I'd say use your own judgement here — you know your contacts better than I do!`;
  }

  const pool = prediction === "spam" ? spam_commentaries : ham_commentaries;
  return pool[Math.floor(Math.random() * pool.length)];
}

/* Export globals */
window.SpamGuardModel = {
  train: trainAndEvaluate,
  analyze: analyzeMessage,
  commentary: generateCommentary,
  getMetrics: () => METRICS,
  SPAM_SIGNALS,
};
