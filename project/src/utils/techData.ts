interface TechContent {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  fullContent: {
    overview: string;
    features: string[];
    benefits: string[];
    useCases: string[];
  };
}

export const technologies: TechContent[] = [
  {
    id: 'kafka',
    title: 'Apache Kafka',
    description: 'Distributed event streaming platform capable of handling trillions of events a day',
    color: 'from-emerald-400 to-teal-500',
    icon: 'MessageSquare',
    fullContent: {
      overview: 'Apache Kafka is a distributed event streaming platform that combines messaging, storage, and stream processing to enable real-time data pipelines and streaming applications.',
      features: [
        'Publish and subscribe to streams of records',
        'Store streams of records durably and reliably',
        'Process streams of records as they occur',
        'Distributed architecture for high scalability',
        'Fault-tolerant and reliable message delivery'
      ],
      benefits: [
        'High throughput for both publishing and subscribing',
        'Built-in partitioning, replication, and fault-tolerance',
        'Scales horizontally with zero downtime',
        'Extremely low latency for real-time applications',
        'Enterprise-grade security features'
      ],
      useCases: [
        'Real-time streaming data pipelines',
        'Messaging and event-driven architectures',
        'Activity tracking and monitoring',
        'Metrics and logging aggregation',
        'Stream processing with exactly-once semantics'
      ]
    }
  },
  {
    id: 'angular',
    title: 'Angular',
    description: 'Platform for building mobile and desktop web applications using TypeScript',
    color: 'from-red-400 to-rose-500',
    icon: 'Code2',
    fullContent: {
      overview: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your applications.',
      features: [
        'Component-based architecture',
        'Powerful templating syntax',
        'Built-in dependency injection',
        'Comprehensive routing system',
        'Form handling and validation'
      ],
      benefits: [
        'Enhanced development productivity',
        'Consistent code structure and patterns',
        'Strong typing with TypeScript',
        'Excellent tooling and IDE support',
        'Large ecosystem of libraries'
      ],
      useCases: [
        'Enterprise web applications',
        'Progressive web apps (PWAs)',
        'Dynamic content websites',
        'Single-page applications (SPAs)',
        'Complex data dashboards'
      ]
    }
  },
  {
    id: 'aws',
    title: 'AWS',
    description: 'Comprehensive cloud computing platform with 200+ featured services',
    color: 'from-orange-400 to-amber-500',
    icon: 'Cloud',
    fullContent: {
      overview: 'Amazon Web Services (AWS) is a comprehensive and widely adopted cloud platform, offering over 200 fully featured services from data centers globally.',
      features: [
        'Compute services (EC2, Lambda)',
        'Storage solutions (S3, EBS)',
        'Database services (RDS, DynamoDB)',
        'Networking & CDN (VPC, CloudFront)',
        'Security services (IAM, KMS)'
      ],
      benefits: [
        'Pay-as-you-go pricing model',
        'Global infrastructure',
        'High availability and reliability',
        'Advanced security features',
        'Extensive service integration'
      ],
      useCases: [
        'Web and mobile applications',
        'Data processing and analytics',
        'Enterprise applications',
        'Game development',
        'IoT solutions'
      ]
    }
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    description: 'Dynamic programming language that powers the interactive web',
    color: 'from-yellow-400 to-amber-500',
    icon: 'Code',
    fullContent: {
      overview: 'JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. It enables interactive web pages and is an essential part of web applications.',
      features: [
        'First-class functions',
        'Dynamic typing',
        'Prototype-based object-orientation',
        'Event-driven programming',
        'Rich standard library'
      ],
      benefits: [
        'Universal browser support',
        'Large developer community',
        'Rich ecosystem of libraries',
        'Asynchronous programming capabilities',
        'Full-stack development possible'
      ],
      useCases: [
        'Front-end web development',
        'Server-side applications',
        'Mobile app development',
        'Desktop applications',
        'Browser extensions'
      ]
    }
  },
  {
    id: 'rest',
    title: 'REST Services',
    description: 'Architectural style for distributed hypermedia systems',
    color: 'from-blue-400 to-indigo-500',
    icon: 'Network',
    fullContent: {
      overview: 'REST (Representational State Transfer) is an architectural style that defines a set of constraints to be used for creating web services. REST APIs allow for interaction with RESTful web services.',
      features: [
        'Stateless communication',
        'Uniform interface',
        'Resource-based URLs',
        'Multiple data format support',
        'Standard HTTP methods'
      ],
      benefits: [
        'Scalability and performance',
        'Independent of client technology',
        'Caching capabilities',
        'Easy to understand and implement',
        'Wide tool support'
      ],
      useCases: [
        'Web APIs',
        'Mobile application backends',
        'Microservices architecture',
        'Cloud service integration',
        'Third-party API integration'
      ]
    }
  }
];