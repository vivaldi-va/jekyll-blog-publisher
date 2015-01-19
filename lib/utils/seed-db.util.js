/**
 * Created by vivaldi on 19/01/2015.
 */

var mongoose	= require('mongoose');
var PostsModel	= require('../api/posts/posts.model');
var log		= require('log4js').getLogger('Utils.SeedPosts');

module.exports = function() {
	"use strict";
	var posts = [
		{
			title: "90 days",
			text: "Welcome to Moni's blog. My name is Laurence Aderemi, CEO and Co-founder of Moni. Here you'll find updates on our developments, products announcements and lessons that we've learned.\n\nFirst, I'd like to share the reason for starting our company.\n\nMoni was born out of a personal frustration. About a year ago, my mother got critically ill and I found myself having to send money home urgently. I had never done this before and quickly discovered that transferring money abroad is really inconvenient and expensive. It seems that in despite the technological advances in other areas of our life, the way we send money has not significantly changed in 100 years.\n\nSo my Co-founder and I, saw a great opportunity to bring the benefits of mobile technology into this still unchanged area of money transfers, and Moni was born.\n\nWhile working at Google I had met many companies with promising technologies which I thought could be integrated into an app that could be intuitive and easy to use, while concealing all the complexities of the archaic infrastructure that exists with current money transfer methods.\n\nWe were fortunate to be accepted as one of the 10 companies to participate in the TechStars London 2013 programme. TechStars is the #1 accelerator in the world and this was their first foray outside of the US.  During the past three intense months, we worked really hard to make our vision a reality and although our product is still work in progress, we are very proud of the results thus far.\n\nWe are building something that's fundamentally different from everything else out there and  were quite excited to share our prototype at TechStars' Demo Day last Friday.\n\nWe shared the stage with other 9 amazing companies who are also tackling interesting challenges in the fintech, digital TV analytics, gaming, voice processing, and collaborative consumption spaces (more about them in another post). This was a culmination of 13 long weeks of learning, sharing, collaborating and getting frustrated as a group.\n\nSome 300+ people attended the event and based on some of the early feedback (see coverage in Techcrunch and The Next Web)  there is great excitement about the potential for our product.\n\nOver the next 90 days, we will launch a private beta so a limited number of hand-picked early adopters can help us refine our product.  If you'd like to help us shape the future of mobile payments, sign up for our beta today .\n\nStay tuned!",
			meta: {
				author: {
					_id: mongoose.Types.ObjectId(),
					name: {
						first: "Laurence",
						last: "Aderemi"
					}
				},
				post_date: new Date('10/02/2013'),
				contributors: []
			},
			attrs: {
				publish_date: new Date('10/02/2013'),
				status: "published"
			}
		},
		{
			title: "Takeaways from the London Techstars programme",
			text: "We were fortunate enough to be one of the 10 startups selected to participate in Techstars’ first accelerator program outside the US this summer. Techstars is the #1 startup accelerator in the world backed by over 75 different venture capital firms and angel investors. It is an intensive 13 weeks mentorship-driven program and, like Y Combinator, it is extremely selective: less than 1% of companies that apply are accepted.\n\n<!--more-->\n\nThe culmination of the 90-day incubation period is Demo Day –an opportunity for each team to present their start-up, via a pitch honed over many weeks of hard work, to over 300 investors, entrepreneurs, and journalists at Demo Day.\n\nHere are some key takeaways from the program:\n\n1.  ABP &#8211; Always be pitching. Know your story and be able to articulate it in one sentence.\n2.  Every team in the room is full of smart and talented people. Make friends with other entrepreneurs as they will be your biggest supporters as well as an objective sounding board.\n3.  You will get conflicting advice from mentors; this is known as mentor whiplash. It’s up to you to filter out the noise and identify what is truly valuable and actionable.\n4.  Never say there are no competitors. If there is no competition, then you are screwed!\n5.  Own your technology – always build the product and backend yourself.  Outsourcing will backfire in the long run. It’s OK to outsource in the short-term to hit key milestones, but have a transition plan in your back pocket.\n6.  Finding others to join your startup is an ongoing process – keep your ears open for great talent, you will probably need them sooner than you think.\n7.  You have to be a salesman. Do not be scared to ask for money. Without funding you are screwed.\n8.  Don’t try to optimise for valuation at the seed stage. Just accept that raising money is easier/faster and valuations are better across the pond (start packing that suitcase if you are serious about creating a billion dollar company).\n9.  Keeping the lights on is harder than you think, and it will only get harder\n10. Real businesses have real customers and real customers are those that bring in revenue. Until then you have nothing!\n11. Applications for Techstars in London are open for the 2014 program. Early application deadline is 6 December 2013 and final deadline is 31 December 2013. Good Luck!",
			meta: {
				author: {
					_id: mongoose.Types.ObjectId(),
					name: {
						first: "Laurence",
						last: "Aderemi"
					}
				},
				post_date: new Date('10/31/2013'),
				contributors: []
			},
			attrs: {
				publish_date: new Date('10/31/2013'),
				status: "published"
			}
		},
		{
			title: "Remittances. A confusing term at times.",
			text: "When I first started sharing my vision for Moni with friends and colleagues, I was amazed that most of them had no idea what &#8216;remittances&#8217; meant. Some thought it had something to do with lending or confused it with an accountancy term, so I thought it would be a good idea to explain what we understand by remittance and why we are so excited about building product that will help bring the remittance industry to the digital age.\n\n<!--more-->\n\nThe formal definition (according to Wikipedia at least) is: *a transfer of money by a foreign worker to his or her home country*. Usually such remittances are relatively frequent – about 6 times per year – and their amount is on average $350 or less. This does not truly reflect the huge amounts of money that flow around the world, from the countries most favoured by the changing immigration waves. The 200+ million people that currently live in a country other than their own and support their families back home are expected to transfer $685 billion per year by 2015.\n\nWhile the volume of funds moving across borders may be different, there&#8217;s nothing new about immigrants sending money home. What strikes us as odd is that most of us are still sending money in the same way we did 100 years ago. That is, by relying on Money Transfer Operators (MTOs) like Western Union – the very same company that created the first transcontinental telegraph line in 1861 and which today is responsible for $1 out of every $5 wired around the world. Last year it sent more than $80 billion through its global network of more than 500,000 agents. This brick-and-mortar distribution network has both been the source of their transaction volume growth and also the justification for their high commissions, which average 9.5% (according to the World Bank) and keep yielding hefty revenues &#8211; $5.7 billion in 2012 for Western Union alone.\n\nSo that&#8217;s how we&#8217;ve arrived to the present situation: MTOs have an ubiquitous presence and benefit from bloated commissions. Customers on the other end, endure slow transaction processing, opaque fee structures, poor exchange rates, and the inconvenience of having to go to a store at -often- unsafe locations to wait in line and fill out lengthy forms.\n\nIt&#8217;s no wonder customers are getting increasingly frustrated and keen to try new and better ways to send money. Even though cash remittances are growing 3-4% pa, electronic channels are actually growing at a rate of 28%. It is predicted that by 2015, as much as 15% of remittances will be done via mobile devices. This is why we think the future can&#8217;t come soon enough, and are working hard to build a mobile-first solution that makes it simple, convenient and cost-effective to send money from your phone 24 hours a day.\n\nYour support means a lot to us.\n\nYou can email us on <info@monitechnologies.com> or follow us on Twitter [@monimobile][1]. If you'd like to try Moni, please sign up for an invite [here][2].\n\n [1]: https://twitter.com/monimobile\n [2]: http://moni.to",
			meta: {
				author: {
					_id: mongoose.Types.ObjectId(),
					name: {
						first: "Laurence",
						last: "Aderemi"
					}
				},
				post_date: new Date('12/09/2013'),
				contributors: []
			},
			attrs: {
				publish_date: new Date('12/09/2013'),
				status: "published"
			}
		},
		{
			title: "Bitcoins—more than just hype",
			text: "Bitcoin is big news.\n\nLast week, Charlie Shrem, 24, CEO at the Bitcoin exchange company BitInstant.com, was arrested and charged with money laundering and operating an unlicensed money transmitting business. Leading investor Marc Andreessen recently wrote a piece in the New York Times titled &#8220;Why Bitcoin Matters.&#8221; \n\n<!--more-->\n\nLast week, Jamie Dimon (CEO of JP Morgan) dismissed bitcoin on CNBC. Not a day goes by without a eye-catching headline, fromGoogle's supposed plans to incorporate bitcoins to its payment strategy to Lamborghini's dealership accepting bitcoin payments. All this buzz and attention from the press and investors, has triggered a wave of new startups: there are 156 bitcoin companies on Angellist already,  with an average valuation of $4.5m.  However, whilst the tech community remains transfixed by bitcoins, the regulators continue to be nervous about it and the financial community treat it with disdain.\n\nThere are two aspects of bitcoin's setup that is appealing to companies involved in international money transfers: 1) It is the first Internet payment system where transactions either happen with no fees or very low fees (down to fractions of pennies), whereas the typical fees for existing payment systems average around 2- 3%. 2) The ledger framework also eliminates the risk of fraud.\n\nIt's easy to see how, with the global average remittance cost hovering around 10%, virtual currencies like Bitcoin could result in drastically cheaper, faster and frictionless international money transfers. On the other hand though, it is hard to envisage mass adoption without significant regulatory intervention, and the increased attention bitcoin has garnered from the regulator supports this notion. Reactions and approaches vary: from outright bans (India and China), to the development of specific regulatory guidance (FINCEN &ndash; March 2013), and just this week, New York State top bank regulator Benjamin Lawsky revealed concrete plans to regulate businesses handling transactions in bitcoin. In the UK too, financial regulators have been meeting with companies in an attempt to put structures in place for operating in the realm of bitcoin.\n\nThe long term impact of such regulation on the aspects of bitcoin that make it so appealing today&mdash;i.e. as a potentially low-friction, low-cost cross-border payment method, or a means to store value and hedge against inflation for citizens of countries with volatile currencies&mdash;is difficult to predict. However, more regulation, increased KYC and audit requirements will surely lead to a marked increase of the per-transaction-cost&mdash;when converting bitcoins to hard, local currencies&mdash;from \"fractions of a penny\" to significantly more\n\nWhilst we are focused on changing the way people send money around the world, our position is that of 'cautious excitement'. We are building a product that provides an enjoyable and frictionless user experience, by hiding away the ugly inefficiencies of an outdated banking infrastructure and 'traditional' payment pipes.  The key partners that provide these 'rails' and APIS are bound by the financial regulations of the countries in which they operate, and we have to comply with those if we want our product to reach users in those countries. If accepting bitcoins introduces a certain level or risk/liability into our operations, this risk is, by the nature of our relationship passed on to them.\n\nIn short, the creation of a  basic regulatory framework&mdash;especially one that does not hinder the intrinsically borderless nature of Bitcoin&mdash;would create an environment that is just safe enough for us to embed this new technology into our product and make it available to our users around the world. Anything other than a 'light touch' approach would see this potentially transformative innovation reduced to just another payment system.",
			meta: {
				author: {
					_id: mongoose.Types.ObjectId(),
					name: {
						first: "Laurence",
						last: "Aderemi"
					}
				},
				post_date: new Date('10/02/2013'),
				contributors: []
			},
			attrs: {
				publish_date: new Date('01/31/2014'),
				status: "published"
			}
		},
		{
			title: "Take Aways from Mobile World Congress 2014",
			text: "Moni was excited to be invited by the UKTI Venture Capital Unit to attend The Mobile World Congress (MWC), in Barcelona. We were part of the ‘Best of British Mobile Startups’ Showcase, at one of the tech industry&#8217;s most important annual events, which drew a record 85,000 attendees (20% higher than last year).\n\n<!--more-->\n\nMoni, along with 9 other disruptive UK startups got a chance to pitch to some of the most influential investors and players in the mobile industry. It was a great opportunity to take a pulse of the upcoming trends in the mobile space, meet prospective partners, and even reconnect with old friends.\n\nI think it was one of the most exciting conference of the last few years, with everyone from [The Guardian][1] to [Wall Street Journal][2] commenting on the highlights. From my own experience attending MWC, here are my top 3 takeaways:\n\n* The Internet of Things: has been gathering momentum over the last couple of years, and it seems that many manufacturers chose <a href=\"http://global.samsungtomorrow.com/?p=34772\">MWC to present</a> the first solid first wave of gadgets and wearables products that interact with each other. These will appeal to early adopters, but it will be quite interesting to see how these kinds of products evolve and become mainstream. Can the dreams of developers and designers take that leap beyond fans on Kickstarter and into retailers, like Carphone Warehouse?\n* Low cost smartphones: The multitude of super-cheap smartphones on display, with price points as low as $25, is a sign of things to come. In one way, it could be truly transformational in bringing the internet to hundreds of millions of individuals across the globe. Bringing the pragmatic aims of device manufacturers in line with the dreams Zuckerberg wants to accomplish with <a href=\"http://internet.org/\">Internet.org</a>. On the other hand, the big screen, premium-priced devices market is saturated at the top end. For smartphone growth to continue phone manufacturers now have to develop cheaper models, like the Nokia X or cheaper Latin American handsets, like the Alcatel Onetouch. This trend will result in yet more of our potential users in developing countries (and most attractive remittance corridors) being just one click away from the Moni app.\n* Mobile IS the future of money: As evidenced by Paypal’s figures, which processed $27 billion in mobile payments last year (up from $150m in 2009) the growth and popularity of mobile payments is exponential.  The same is occurring with mainstream adoption of mobile financial apps. Barclays has taken only 2 months to acquire their first 2 million mobile banking customers. It took them 13 years to get the same number of online banking customers.\n\nHowever it is in the emerging markets where there are limited legacy systems and a sizable underbanked market that mobile and money are truely converging. Research shows that:\n\n* There are more than 90 million mobile wallets in Africa, and in 9 African countries there are more mobile wallets than bank accounts. Mobile is considered safer.\n* GSMA, the association of mobile operators, estimate that there are 220 mobile services in 84 countries.\n* Over 66% of Kenyans, 50% of Ugandans, 33% of South Africans have used their mobile devices for payments (according to Pew Global).\n\nThe pace of innovation is truly breathtaking and mobile is where it is all happening. MWC was reeling from the news of Facebook’s $19bn acquisition of Whatsapp and the potential impact on telecoms revenue, especially if they do to voice communications what they did to SMS. It is hard to doubt Benedict Evans when he says that ‘mobile is eating the world’ and its not just telcos that are watching their backs. Financial services are also battling to stay relevant rather than being reduced to ‘dumb pipes’.\n\nAt Moni, we want to bring frictionless payments to mobile, whether it is for people sending remittances home to their family, or friends buying a drink at a pub. Right now this isn’t the case, which is why we are working to bring our solution to a device near you &#8211; ideally the one in your hand, no matter where you live.\n\n[1]: http://www.theguardian.com/technology/2014/feb/23/zuckerberg-facebook-barcelona-mobile-world-congress\n[2]: http://online.wsj.com/news/articles/SB10001424052702304071004579408661068736086?mg=reno64-wsj&url=http%3A%2F%2Fonline.wsj.com%2Farticle%2FSB10001424052702304071004579408661068736086.html",
			meta: {
				author: {
					_id: mongoose.Types.ObjectId(),
					name: {
						first: "Laurence",
						last: "Aderemi"
					}
				},
				post_date: new Date('03/05/2014'),
				contributors: []
			},
			attrs: {
				publish_date: new Date('03/05/2014'),
				status: "published"
			}
		},
		{
			title: "Six Tips For A Safer Money Transfer",
			text: "You should always feel secure when you are sending money. Not only that, but to stay on the right side of the law you should be sending money as yourself (not on the behalf of anyone else) and to someone you know. If your money isn’t secure, then what is? Which is why we have put together some tips for sending funds knowing they will arrive safely at their destination.\n\n<!--more-->\n\n###1. Have a strong Password\n\nPassword theft is on the increase. It is becoming easier and cheaper for criminal gangs to steal our online data, including banking and payment service login details, which can cause a great deal of financial damage and problems for those affected. One of the best ways to guard against this is to always have strong passwords. Never the same one for say your email and your online banking, or any other key online account. Use a combination of upper and lower case letters, numbers and where possible, symbols. And like a PIN number, don’t tell anyone or write them down on an unencrypted document on your computer.\n\n###2. Only Send Money To People You Know\n\nBanks have a key aspect of their security procedures known as KYC (know your customer). When transferring money you ought to use the same approach. In such a transaction you are the customer, but at the same time you ought to know where the money is going. Don’t send funds to people you don’t know, met on the internet, or got a suspicious email from. Verify before clicking send.\n\n###3. Are You Really The Customer? If Not, Don’t Send The Funds\n\nFollowing on from the KYC idea, if you send funds on behalf of someone else, you’ve violated those principles. Only transfer money for yourself and send funds to those you know. You could get into a lot of trouble if you end up sending money to someone you don’t know and it turns out those funds were used for illegal purposes.\n\n###4. Only Send Money For Legal Purpose\n\nIt should sound obvious, but wire transfers and remittances can be more easily hijacked by criminal gangs and terrorists. However, compared to banks, they are more easy to monitor by security and intelligence services. Which means if you are sending money for anything which violates the law, especially if doing so internationally, you could land yourself in a world of trouble. Companies like ourselves, who are regulated by the Financial Services Authority under the Payment Service Regulations 2009, have a duty to provide records of any suspect transactions. Every reputable payment services company has the same responsibility, which means for anyone doing anything illegal, it is best to look elsewhere.\n\n###5. Use A Secure, Encrypted Connection\n\n\nEncryption is essential for sending something as valuable as money. You should expect the same level of security from any payment service as you would your bank. It is important to look out for SSL (Secure Sockets Layer) or TLS (Transport Layer Security), which means if you are using a web browser look for “Https” in the URL. All of this helps keep your money out of the wrong hands.\n\n###6. Watch Out For Scams\n\nOne of the easiest ways criminals can get into our wallets is through internet scams. Normally word spreads around the web fairly fast when a new scam pops up. But this still means some people fall victim to them in order for the scams to become widely known. There are all kinds of them going around. The best defense is common sense. Don’t reply  to emails with bank or security details when you get an email you don’t recognise, or send money to people you don’t know. Verification and common sense will keep you safe.\n\nRemember, know who you are sending money to, and only send your own funds. Keep safe online with secure passwords, encrypted connections and a decent amount of common sense to protect you from online fraud and scams. That way, when you do send money, you will feel confident and secure.",
			meta: {
				author: {
					_id: mongoose.Types.ObjectId(),
					name: {
						first: "Laurence",
						last: "Aderemi"
					}
				},
				post_date: new Date('03/25/2014'),
				contributors: []
			},
			attrs: {
				publish_date: new Date('03/25/2014'),
				status: "published"
			}
		},
		{
			title: "London—The Centre of a Global Fintech Boom",
			text: "The study, \n[\"The Boom in Global Fintech Investment; A new growth opportunity for London\"](http://www.cbinsights.com/blog/trends/global-fin-tech-investment-accenture%20%20), is based on analysis of investment data from CB Insights over the past decade.\n\n<!--more-->\n\n###London: The Centre of Global Fintech Growth\n\nThe total amount invested in financial tech startups globally has gone up to $2.97 billion in 2013, from $928 million in 2008.\n\nLondon accounts for over half (53%) of all fintech investments in Europe, with deal-volume accelerating at an annualised rate of 74% since 2008 (compared to 27% globally, 13% in southern California; Silicon Valley & San Francisco). The total value invested in London has increased nearly eightfold since 2008.\n\nAlthough the market is still described as \"immature\" compared to California, due to current deal-volumes, this rate of growth indicates London is fast making up for lost ground. Hence the growth of dedicated accelerators, including <a href=\"https://www.fintechinnovationlablondon.co.uk/\">Accenture’s London FinTech Innovation Lab</a>, a new one by <a href=\"http://www.startupbootcamp.org/accelerator/fintech-london.html\">Startupbootcamp</a>, and <a href=\"http://barclaysaccelerator.com/\">Barclays Accelerator</a> (powered by TechStars).\n\n###Fintech and Financial Services: Putting The Customer First\n\nLondon is the right place for a fintech boom. It is the home of our financial services sector, which contributes billions to the economy and employs over 2 million people nationally. Financial giants, like Barclays, can benefit from the outpourings of innovation, in the same way that startups can benefit from the expertise, insights and investments made by those working in the sector. Everyone has something to gain from this relationship, especially customers, who will benefit from better products and services, which solve their actual needs and pain points.\n\n\nAccenture's Julian Skan, MD of the FinTech Innovation Lab commented on the report, saying that \"It is crucial to London maintaining its position as the leading global financial center because of the growing importance of technology to the financial industry.\"\n\n\n[1]: https://moni.to/assets/accenture3-1024x490.jpg",
			meta: {
				author: {
					_id: mongoose.Types.ObjectId(),
					name: {
						first: "Athina",
						last: "Saravelou"
					}
				},
				post_date: new Date('04/11/2014'),
				contributors: []
			},
			attrs: {
				publish_date: new Date('04/11/2014'),
				status: "published"
			}
		},
		{
			title: "A World Without Wallets: Your Cashless, Cardless Future",
			text: "Let's face it, the whole process is a nuisance. Cash is a pain. For those who keep track of their spending, cash leaves a black hole of “I wonder what that was for?” while every other transaction was accounted for. Debit and credit cards are easier, for the most part. Payments take a little longer than cash, but otherwise have fewer friction points than cash.\n\n<!--more-->\n\nThe most convenient types of cards are those, which have Near Field Communication (NFC), enabled which are as easy to use as an Oyster card and there is no need to remember a PIN number. We are going to see a rise of this method of making payments over the coming years, from banks, card issuers and from retailers. The future will be built on the twin pillars of convenience and mobility.\n\n###Double M Growth: Mobile Banking and M-Commerce\n\nA study by Silicon Valley Bank (SVB) has shown good growth in mobile banking and m-commerce.\n\nThe SVB report predicts $1 trillion worth of mobile purchases come 2017. Over 30 million people in Europe already access their bank accounts on smartphones and tablets.\n\nThis is due to an 85% year on year growth in m-banking since 2011. It's simply more convenient.\n\nThere is similar growth when it comes to mobile wallets and sending payments to other people,whether in the same room or half a world away. Again, this is due to added convenience.\n\n###A More Convenient, Frictionless Future\n\nPeople need greater convenience when it comes to shopping and financial services. We already have the ideal devices for this ‘more convenient' future: our smartphones.\n\nBeing able to do your banking, paying people and shopping (whether via an m-commerce store, or in a physical store) all on the same device would make our lives so much easier, tasks faster and convenient to finish. There would be no need for cash machines or switching to a laptop for the important tasks (like online banking).\n\nIn that kind of future, we win back time. Modern life doesn't seem to have enough of it. This is why anything we can do to give ourselves more time and a greater quality of life is worth doing.\n\nSign up to take part in our beta launch: [https://moni.to][1]/. Make mobile payments simpler. Win back a bit more time in your life.\n\n\n [1]: https://moni.to/",
			meta: {
				author: {
					_id: mongoose.Types.ObjectId(),
					name: {
						first: "Anupama",
						last: "Putrevu"
					}
				},
				post_date: new Date('05/02/2014'),
				contributors: []
			},
			attrs: {
				publish_date: new Date('05/02/2014'),
				status: "published"
			}
		},
		{
			title: "How Much?! Beat The Banks When Making International Transfers",
			text: "Here's what you have to do if you want to send money to a bank account abroad. Remember the different steps necessary to withdraw cash. Well, making international payments is even more of nuisances.\n\n<!--more-->\n\nFirstly, you need two pieces of information from the other party&mdash;the person you are sending the funds to.\n\n###The Slow Method: Banks\n\nYou need an IBAN or SWIFT code and a BIC code. These are the international versions of a sort code and account number. They consist of long sequences of numbers and letters. Plus, when you call your bank they'll put you through additional security. All of this takes time. You could easily be on the phone ten to fifteen minutes, calling an 0800 or 0845 number, which costs extra on most networks.\n\nSo there's the added complexity of the other party needing to get the IBAN or SWIFT code and a BIC code. Then you take time, and go to extra expense, to call your bank to transfer the funds.\n\nThe recipient will have to wait a few days to get the money. And on top of that you are typically going to get charged about 3-6% of the overall amount being sent to make this transfer.\n\nSay for example, you are sending £1000 to Europe. It is converted&mdash;at current rates (roughly, as of time of writing)&mdash;into €1,208.47. Most high street banks charge around £20 to £45 for that transfer, taking 3-5 working days, and at least ten minutes of your life on the phone to a call centre.\n\n###The Slightly Faster Method: Online\n\nBut what about PayPal or Western Union? With PayPal it is online or on your mobile, so it is more convenient. Not necessarily cheaper, with their fees, which can be anything from 3.7% to 7.4%, plus a fixed fee, which differs depending on the country. Western Union is not much different, and nearly as expensive as banks.\n\nClearly neither solution is ideal. Too expensive, not easy to use, and too time consuming.\n\n###A Better Way\n\nThe ideal solution is one which is as simple as sending a text. You enter the amount. You click send. It arrives in the other persons phone. They transfer it to a bank account or other financial service which enables them to spend it. That simple. That's the kind of simple to use service we should all have access to already. Coming soon!",
			meta: {
				author: {
					_id: mongoose.Types.ObjectId(),
					name: {
						first: "Athina",
						last: "Saravelou"
					}
				},
				post_date: new Date('05/09/2014'),
				contributors: []
			},
			attrs: {
				publish_date: new Date('05/09/2014'),
				status: "published"
			}
		},
		{
			title: "The Future of Mobile Finance in Developing Countries",
			text: "A survey of mobile financial providers shows that the mobile money market is developing fast, reaching maturity \nand scale in several markets. There are now over 213 providers in 84 countries, with 52 of those having more \nthan one provider. Over 13 have 1 million active users, each.\n\n<!--more-->\n\nThis mass market adoption is also spurring on innovation. In the same way that having a bank account means \nyou can get a credit card or insurance, these mobile money services are creating products for the unbanked. \nA move which was almost unimaginable only a few years ago. There’s now 123 such products, including insurance, \nmobile savings accounts and credit cards, which includes 27 new such services launched in 2013.\n\nThe inflow of remittances, which is increasingly being done using mobiles, is a crucial part of the economy for \nmany developing countries. Unfortunately not everyone is gaining as much benefit from these funds as they should.\n\n###The True Cost of Remittances\n\nThe problem with remittances, especially in Africa, is the cost of making these transfers. It is the most \nexpensive region in the world to send money across borders, whether from another African country, or elsewhere in the world.\n\nThe average fee in most African countries is between 12 – 20% of the amount being sent. In G8 nations \nit’s only 5%. The [World Bank estimates][link-wb] \nthat if remittance fees in Africa were to fall to the G8 average of \n5% it would put an additional $4 billion into African family budgets.\n\n###A Mobile Banking Success: Haiti\n\nFrom brutal dictatorships to hurricanes, civil wars and humanitarian crises. Haiti is in the headlines every \nfew years, never for good reasons. Unsurprisingly, between 85 and 90% of the islands 10 million people are \nunbanked. Mobile penetration is very low – currently between 35 and 40%.\n\nInterestingly, Haiti has the fastest adoption rates for mobile wallets and payments. As of the end of 2012, \nthe two largest mobile financial services in the country, Tcho Tcho Mobile and T-Cash, had already hit the \n10% adoption rate amongst the adult population. Ten million transactions in the first year. Most countries \ntake four years to reach that 10% threshold. Haiti did it in one.\n\nThere were two factors at play which resulted in this rapid adoption. Firstly, the devastating earthquake in \n2010 which killed an estimated 160,000, also destroyed one third of the islands 164 bank branches. As a \nresult, The Bill and Melinda Gates Foundation, working with USAID, offered a $2.5 million prize to successfully \nlaunch a mobile wallet in Haiti. Tcho Tcho Mobile won, with 450,000 subscribers at the end of 2011 and \n6 million transactions processed.\n\nThe lesson here is that where necessity and sufficient incentives are in place (both mobile providers had to \nstimulate use through frequent offers and promotions in the first year) adoption of mobile financial services \ncan happen quickly. This also dramatically lowers the cost of transferring money, pushing people closer to \nfinancial stability and out of poverty.\n\n\n[link-wb]: http://www.gsma.com/mobilefordevelopment/the-rise-of-mobile-wallet-to-wallet-cross-border-remittance-services-whats-the-opportunity",
			meta: {
				author: {
					_id: mongoose.Types.ObjectId(),
					name: {
						first: "Athina",
						last: "Saravelou"
					}
				},
				post_date: new Date('08/20/2014'),
				contributors: []
			},
			attrs: {
				publish_date: new Date('08/20/2014'),
				status: "published"
			}
		},
		{
			title: "Break Down The Door of Poverty With Digital Inclusion",
			text: "Go into town one day without your debit card. Withdraw a pile of cash, then leave your cards at home. See how it feels. Liberating, right? You can&rsquo;t spend more than you have. No need to worry about going over your limits. But also restricting. Once its gone, its gone. \n\n<!--more-->\n\nThat&rsquo;s life for 2.5 billion people around the world. Except they don&rsquo;t have a debit or credit card back home. They can&rsquo;t access to the banks behind them. Restricted, on so many levels, is the only way to describe how people feel, living in the financial shadows. \n\nPoverty in developing nations is made deeper, harder and made more difficult when people lack access to financial services. This keeps families trapped in poverty for generations. Makes it easier to stay unemployed or stay in a cycle of informal, transient work, which only adds to the financial instability. This includes using financial couriers and money lenders who charge rates we only expect of payday lenders. \n\n###The Cost of Poverty \n\nCash is expensive. As means of trade it&rsquo;s inefficient; difficult to move, costly to store. It would be easier for everyone if we did away with physical currency altogether. But a cashless future, whilst most likely to happen within our lifetimes, is still a while away. \n\nIn the meantime the cost of processing cash is passed onto the consumer. When transactions are small it isn&rsquo;t cost effective, especially for banks in developing nations to serve people who don&rsquo;t have much cash to begin with. This keeps the door of the formal economy firmly closed. \n\nThis comes with a huge social cost. Particularly for women. Putting money in their hands would give them control of household budgets, childcare and education, and ultimately, economic empowerment. The UN, IMF and World Bank all agree that giving women in developing countries economic freedom is a key part of the fight against generations of poverty.\n\n###A Cashless Future \n\nMoving away from cash and barter - which still exists in some regions of Sub-Saharan African nations - is the only way to create financial stability and security in the lives of those who don&rsquo;t have those luxuries. Making transactions purely digital is simply easier, for buyers, sellers, savers and the financial sector who can now serve millions of new customers. \n\nThe future of this cashless society starts with a device which almost every has. A mobile phone. With mobile penetration now at 90% globally, there has never been a better time in human history to use technology for a purpose which would benefit so many. \n\nA widespread adoption of mobile wallets, mobile banking and mobile remittances is the solution; a future which is already on the horizon. Combined these could change the lives of the 2.5 billion people worldwide who still live on $2 per-day.",
			meta: {
				author: {
					_id: mongoose.Types.ObjectId(),
					name: {
						first: "Danish",
						last: "Chaudhry"
					}
				},
				post_date: new Date('10/02/2014'),
				contributors: []
			},
			attrs: {
				publish_date: new Date('10/02/2014'),
				status: "published"
			}
		},
		{
			title: "Mobile Money Innovation: From East Africa to Eastern Europe",
			text: "Necessity really is the mother of invention. In Africa, the need for innovation in mobile money is greater than any other region of the world. African customers face higher transaction charges and have much more limited access to banks than anywhere else.\n\n<!--more-->\n\nWhich is why it shouldn&rsquo;t be a surprise to see innovation from East Africa transfer over to Eastern Europe. Vodafone&rsquo;s M-Pesa mobile money service launched in Romania earlier this year. They&rsquo;re targeting a market of 7 million in Romania who, like customers in Africa, mainly only use cash.\n\n###From Kenya With Love\n\nM-Pesa originated in Kenya, developed by Vodafone. A popular mobile money service with 16.8 million active customers, created for the needs of those who don&rsquo;t or can&rsquo;t access traditional financial services. M-Pesa customers send around &pound;720 million in peer-to-peer transfers every month.\n\nVodafone&rsquo;s move into Eastern Europe seems to have been motivated by two factors: new competitors making a leap into the Central and Eastern Europe (CEE) market, and the huge volume of remittances being sent to and from those countries.\n\nMost would assume that remittances only flow one way, from more developed regions of Europe and North America, to CEE countries. However, World Bank figures show that Bulgaria, the Czech Republic, Hungary, Latvia, Lithuania, Poland and Romania send outbound remittances worth $6.3 billion. Since 2002, as the region's economy has grown, this outflow of money has increased 350%. The Czech Republic sends $2 billion outbound, which is the same amount as the UK.\n\n###What&rsquo;s Next for Eastern Europe?\n\nIn Kenya, mobile money - which is where people transfer digital funds from one phone to another - is how one third of the countries $44bn economy moves around. Many people, who didn&rsquo;t have bank or savings accounts, now have loans and savings, through services like M-Shwari, also owned by Vodafone.\n\nSavings, loans, insurance, even investments: are we likely to see similar innovations for Romania&rsquo;s 7 million unbanked?\n\nIf customers adopt services in the same way, then this could beneficial for millions across CEE countries. No longer having to carry and store cash. No longer having that worry, whilst actually being able to earn interest and borrow, would be a big leap forward. Actually being able to participate in the formal economy would open a lot of doors, which would help the region as well as Eastern European expats spread around the world.",
			meta: {
				author: {
					_id: mongoose.Types.ObjectId(),
					name: {
						first: "Danish",
						last: "Chaudhry"
					}
				},
				post_date: new Date('11/13/2014'),
				contributors: []
			},
			attrs: {
				publish_date: new Date('11/13/2014'),
				status: "published"
			}
		}
	];

	for(var i in posts) {
		var post = posts[i];
		PostsModel.create(post, function(err, doc) {
			"use strict";
			if(err) {
				log.error("Failed to seed post", err);
				return;
			}

			log.info("Created post %s", post.title);
		});
	}
};


