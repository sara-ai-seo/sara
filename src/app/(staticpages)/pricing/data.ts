export const pricingdata = [
    {
        icon: '/pricing/basic.svg',
        title:'Basic plan',
        price: '$99/mth',
        amount: 99,
        pricingId:2,
        points: [
            'Unlimited projects',
            '500 credit units per month',
            'Access to all features'
        ],
        save: null,
        pricingPerFeature: [
            'Technical SEO audit - $0.16/unit',
            'Rank tracker - $0.18/unit',
            'Content analysis - $0.30/unit',
            'Competitor analysis - $0.20/unit',
            'Keyword explorer - $0.17/unit'
        ],
        description: "For small businesses, startups, and individual users.",
        fn: ()=> console.log('Hello Basic')

    },
    {
        icon: '/pricing/pro.svg',
        title:'Pro plan',
        price: '$189/mth',
        amount:189,
        pricingId:3,
        points: [
            'Unlimited projects',
            '1,000 credit units per month',
            'Access to all features'
        ],
        save: null,
        description: 'For medium-sized businesses and growing agencies.',
        pricingPerFeature: [
            'Technical SEO audit - $0.15/unit',
            'Rank tracker - $0.16/unit',
            'Content analysis - $0.28/unit',
            'Competitor analysis - $0.18/unit',
            'Keyword explorer - $0.15/unit'
        ],
        fn: ()=> console.log('Hello Pro')

    },
    {
        icon: '/pricing/enterprise.svg',
        title:'Enterprise plan',
        price: '$280/mth',
        amount:280,
        pricingId:4,
        points: [
            'Unlimited projects',
            '2,500 credit units per month',
            'Access to all features'
        ],
        save: null,
        description: 'For large enterprises and established SEO agencies.',
        pricingPerFeature: [
            'Technical SEO audit - $0.12/unit',
            'Rank tracker - $0.14/unit',
            'Content analysis - $0.25/unit',
            'Competitor analysis - $0.16/unit',
            'Keyword explorer - $0.13/unit'
        ],
        fn: ()=> console.log('Hello Advanced')

    }
]

export const annualPricingData = [
    {
        icon: '/pricing/basic.svg',
        title:'Basic plan',
        price: '$990/yr',
        amount:990,
        pricingId:5,
        save: '$198',
        points: [
            'Unlimited projects',
            '600 credit units per month',
            'Access to all features'
        ],
        pricingPerFeature: [
            'Technical SEO audit - $0.16/unit',
            'Rank tracker - $0.18/unit',
            'Content analysis - $0.30/unit',
            'Competitor analysis - $0.20/unit',
            'Keyword explorer - $0.17/unit'
        ],
        description: "For small businesses, startups, and individual users.",
        fn: ()=> console.log('Hello Basic')

    },
    {
        icon: '/pricing/pro.svg',
        title:'Pro plan',
        price: '$1890/yr',
        amount:1890,
        pricingId:6,
        save: '$378',
        points: [
            'Unlimited projects',
            '12,000 credit units per month',
            'Access to all features'
        ],
        description: 'For medium-sized businesses and growing agencies.',
        pricingPerFeature: [
            'Technical SEO audit - $0.15/unit',
            'Rank tracker - $0.16/unit',
            'Content analysis - $0.28/unit',
            'Competitor analysis - $0.18/unit',
            'Keyword explorer - $0.15/unit'
        ],
        fn: ()=> console.log('Hello Pro')

    },
    {
        icon: '/pricing/enterprise.svg',
        title:'Enterprise plan',
        price: '$2800/yr',
        amount:2800,
        pricingId:7,
        save: '$560',
        points: [
            'Unlimited projects',
            '30,000 credit units per month',
            'Access to all features'
        ],
        description: 'For large enterprises and established SEO agencies.',
        pricingPerFeature: [
            'Technical SEO audit - $0.12/unit',
            'Rank tracker - $0.14/unit',
            'Content analysis - $0.25/unit',
            'Competitor analysis - $0.16/unit',
            'Keyword explorer - $0.13/unit'
        ],
        fn: ()=> console.log('Hello Advanced')

    }
]

export const faqdata = [
    {
        title: 'Is there a free trial available?',
        answer: 'Yes, we offer a free trial for our SEO services. It allows you to explore the features and benefits of our platform before deciding on a subscription plan.'
    
    },
    {
        title: 'Can I change my subscription plan?',
        answer: 'Of course. You can upgrade or downgrade your subscription plan at any time to better suit your evolving needs. Changes will take effect during the next billing cycle.'
    },
    {
        title: 'What is your cancellation policy?',
        answer: "We understand that things change. You can cancel your subscription at any time. If you cancel during a billing cycle, you'll continue to have access to the service until the end of that billing period."
    },
    {
        title: 'Are there any hidden fees or extra charges?',
        answer: "No, we believe in transparent pricing. There are no hidden fees or extra charges beyond what is outlined in your selected subscription plan. You'll only pay the agreed-upon amount based on your chosen features and usage."
    },
    {
        title: 'How does billing work?',
        answer: "Billing for our SEO services is straightforward and transparent. When you subscribe to one of our plans, you'll be billed according to the selected billing cycle—either monthly or annually."
    },
    {
        title: 'Is there a refund policy in place?',
        answer: "Yes, we have a refund policy. If you are dissatisfied with our services within the first [X] days of your subscription, you can request a refund. Please refer to our refund policy for detailed information."
    },
    
] 