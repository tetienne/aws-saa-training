// Question bank — AWS Certified Solutions Architect Associate (SAA-C03 / 2026)
// Official domains:
//   1 = Design Secure Architectures (30%)
//   2 = Design Resilient Architectures (26%)
//   3 = Design High-Performing Architectures (24%)
//   4 = Design Cost-Optimized Architectures (20%)
// multi: true => multiple correct answers (correct is an array of indices)

const QUESTIONS = [
  {
    id: 1, domain: 1,
    q: "A company hosts a web application on EC2 instances behind an Application Load Balancer. The security team requires that all traffic to the instances be encrypted and that TLS certificates be managed centrally and renewed automatically. Which solution meets these requirements with the LEAST operational overhead?",
    options: [
      "Import a third-party certificate onto each EC2 instance and write a renewal cron job",
      "Use AWS Certificate Manager (ACM) to provision a public certificate and associate it with the ALB's HTTPS listener",
      "Store the certificates in AWS Secrets Manager and distribute them to the instances through SSM",
      "Enable EBS volume encryption on the EC2 instances"
    ],
    correct: 1,
    explanation: "ACM automatically provisions and renews public certificates at no cost and integrates natively with ALB HTTPS listeners. There is no manual renewal to manage. EBS encryption protects data at rest, not traffic in transit."
  },
  {
    id: 2, domain: 2,
    q: "An application stores session data in a database. During a traffic spike, the relational database becomes the bottleneck. The team wants a highly available session store with sub-millisecond latency. What do you recommend?",
    options: [
      "Amazon RDS Multi-AZ",
      "Amazon DynamoDB with DynamoDB Accelerator (DAX)",
      "Amazon ElastiCache for Redis in cluster mode with replicas",
      "Store the sessions as files on Amazon EFS"
    ],
    correct: 2,
    explanation: "ElastiCache for Redis delivers sub-millisecond latency, high availability through Multi-AZ replicas with automatic failover, and is designed for session storage. DAX accelerates DynamoDB but is not a general-purpose session store. EFS and RDS do not provide sub-millisecond latency."
  },
  {
    id: 3, domain: 4,
    q: "A batch processing workload can tolerate interruptions and runs flexibly at night. The customer wants to minimize EC2 compute costs. Which purchasing option is MOST appropriate?",
    options: [
      "On-Demand Instances",
      "3-year Reserved Instances",
      "Spot Instances",
      "Dedicated Hosts"
    ],
    correct: 2,
    explanation: "Spot Instances provide up to 90% savings compared to On-Demand and are a perfect fit for interruption-tolerant, non-urgent workloads such as batch processing. Reserved Instances suit steady, continuous workloads, not flexible ones."
  },
  {
    id: 4, domain: 2,
    q: "A company runs a critical application on EC2 in a single AZ. It must make the application tolerant to Availability Zone failures without changing the code. Which combination of services meets the requirement? (Choose TWO.)",
    multi: true,
    options: [
      "Deploy the instances in an Auto Scaling group spread across multiple AZs",
      "Place an Application Load Balancer in front of the instances spread across multiple AZs",
      "Migrate to a single larger EC2 instance (scale up)",
      "Enable connection termination on the NAT Gateway",
      "Store the application on an EBS io2 volume"
    ],
    correct: [0, 1],
    explanation: "A multi-AZ Auto Scaling group ensures instances run in several zones and replaces failed instances, while an ALB distributes traffic across the healthy AZs. Together they provide AZ fault tolerance. Vertical scale-up remains a single point of failure."
  },
  {
    id: 5, domain: 1,
    q: "A Lambda application must access an RDS database in a private VPC and read a secret from Secrets Manager. What is the recommended security practice for the credentials?",
    options: [
      "Hard-code the credentials in the Lambda environment variables",
      "Attach an IAM execution role to the Lambda function that authorizes access to the secret, and retrieve the secret at runtime",
      "Store the credentials in an encrypted public S3 file",
      "Pass the credentials as parameters on every invocation"
    ],
    correct: 1,
    explanation: "The IAM execution role grants temporary, auditable permissions. The function retrieves the secret from Secrets Manager at runtime (with automatic rotation possible). Hard-coding credentials or exposing them is a poor security practice."
  },
  {
    id: 6, domain: 3,
    q: "A global static website must serve content with the lowest latency to users worldwide and reduce the load on the S3 origin. Which solution should you choose?",
    options: [
      "Host the site in multiple regional S3 buckets and use Route 53 latency routing",
      "Distribute the content through Amazon CloudFront with the S3 bucket as the origin",
      "Enable S3 Transfer Acceleration",
      "Use Global Accelerator in front of the S3 bucket"
    ],
    correct: 1,
    explanation: "CloudFront caches static content at edge locations close to users, reducing latency and offloading the S3 origin. S3 Transfer Acceleration optimizes uploads, not distribution. Global Accelerator targets TCP/UDP traffic to endpoints, not static content caching."
  },
  {
    id: 7, domain: 4,
    q: "A company stores 50 TB of logs in S3 Standard. Logs older than 30 days are rarely accessed but must remain retrievable within minutes. After one year, they can be archived with retrieval taking several hours. Which strategy minimizes costs?",
    options: [
      "Keep everything in S3 Standard and enable versioning",
      "Configure a lifecycle policy: transition to S3 Standard-IA at 30 days, then to S3 Glacier Flexible Retrieval at 365 days",
      "Move everything immediately to S3 Glacier Deep Archive",
      "Configure a transition to S3 One Zone-IA at 30 days, then deletion at 365 days"
    ],
    correct: 1,
    explanation: "Standard-IA suits infrequently accessed data that still needs fast (minutes) access. Glacier Flexible Retrieval provides low-cost archiving with retrieval in minutes to hours. The lifecycle policy automates these transitions. Moving immediately to Deep Archive would prevent the fast access required during the first 30 days."
  },
  {
    id: 8, domain: 1,
    q: "An organization wants to grant an application running on EC2 instances access to an S3 bucket without storing long-term AWS credentials on the instances. Which approach should it use?",
    options: [
      "Create an IAM user, generate access keys, and place them in ~/.aws/credentials",
      "Attach an IAM role (via an instance profile) to the EC2 instances with a policy granting access to the bucket",
      "Make the bucket public and filter by IP address",
      "Share the account root keys with the application"
    ],
    correct: 1,
    explanation: "An IAM role attached via an instance profile provides temporary credentials that are automatically rotated and retrieved through the instance metadata service. There are no long-term keys to manage or leak. This is the recommended practice for EC2 workloads."
  },
  {
    id: 9, domain: 2,
    q: "An Amazon Aurora database must withstand the complete failure of an AWS Region with a recovery point objective (RPO) of a few seconds and a recovery time objective (RTO) of less than one minute. Which solution BEST meets these requirements?",
    options: [
      "Aurora Multi-AZ in a single Region",
      "Aurora Global Database with a secondary Region",
      "Automated snapshots copied to another Region every night",
      "A classic RDS read replica in another Region"
    ],
    correct: 1,
    explanation: "Aurora Global Database replicates with typical sub-second latency to secondary Regions (RPO ~1s) and allows promotion in less than a minute (RTO < 1 min) for regional disaster recovery. Multi-AZ does not protect against a regional failure. Nightly snapshots yield an RPO that is far too high."
  },
  {
    id: 10, domain: 3,
    q: "A microservices application generates an unpredictable volume of messages that must be processed asynchronously, exactly once, and in order within each message group. Which AWS service should you choose?",
    options: [
      "Amazon SQS Standard queue",
      "Amazon SQS FIFO queue",
      "Amazon SNS Standard topic",
      "Amazon Kinesis Data Firehose"
    ],
    correct: 1,
    explanation: "SQS FIFO queues guarantee exactly-once processing and message ordering within a group (message group ID). SQS Standard is best-effort ordering and at-least-once delivery. SNS is pub/sub broadcasting. Firehose is for delivering streams to destinations, not an ordered processing queue."
  },
  {
    id: 11, domain: 1,
    q: "A company wants to isolate sensitive resources in a subnet that must have NO inbound access from the internet, but those resources must be able to download software updates from the internet. Which VPC design meets the requirement?",
    options: [
      "Place the resources in a public subnet with an Internet Gateway",
      "Place the resources in a private subnet that routes outbound traffic through a NAT Gateway in a public subnet",
      "Place the resources in a private subnet with no route to the internet",
      "Use an Internet Gateway with restrictive inbound Security Group rules"
    ],
    correct: 1,
    explanation: "A NAT Gateway allows instances in a private subnet to initiate outbound traffic to the internet (updates) while blocking unsolicited inbound connections from the internet. A public subnet would expose the resources. Without a route, there are no updates."
  },
  {
    id: 12, domain: 4,
    q: "An EC2 compute workload runs 24/7 year-round with steady, predictable usage. The company wants the best rate while keeping the flexibility to change instance family within a Region. Which option should it choose?",
    options: [
      "Spot Instances",
      "Compute Savings Plans",
      "EC2 Instance Savings Plans",
      "On-Demand Capacity Reservations"
    ],
    correct: 1,
    explanation: "Compute Savings Plans offer the most flexible discounts (up to ~66%) by applying to any instance family, size, Region, OS, and even Fargate/Lambda. EC2 Instance Savings Plans are cheaper but lock you into a family within a Region. The requested family flexibility points to Compute Savings Plans."
  },
  {
    id: 13, domain: 2,
    q: "A web application receives image uploads. The processing (resizing) must not block the response to the user and must be able to absorb sudden spikes without losing tasks. Which decoupled architecture do you recommend?",
    options: [
      "The web instance calls a resizing function directly and synchronously",
      "Upload the image to S3, which sends an event to an SQS queue consumed by an Auto Scaling group of workers",
      "Store the images in RDS and run an hourly cron job to process them",
      "Increase the size of the web instances to handle the processing locally"
    ],
    correct: 1,
    explanation: "Decoupling through S3 + SQS absorbs spikes (the queue buffers the tasks) and processes them asynchronously with workers that scale according to queue depth. No task is lost. A synchronous call couples the components and risks loss during a spike or failure."
  },
  {
    id: 14, domain: 3,
    q: "A relational database experiences heavy read load from analytical reporting queries, which degrades transactional performance. The application code can be pointed to a separate endpoint for reads. Which solution improves performance most simply?",
    options: [
      "Enable RDS Multi-AZ",
      "Add read replicas and route the reporting queries to them",
      "Increase the size of the EBS volume",
      "Enable database encryption"
    ],
    correct: 1,
    explanation: "Read replicas offload read (reporting) traffic from the primary instance, improving transactional performance. Multi-AZ provides high availability, not read scaling (the standby does not serve traffic). The application can route reads to the replica endpoint."
  },
  {
    id: 15, domain: 1,
    q: "A company manages multiple AWS accounts and wants to centrally enforce a rule that prohibits deploying resources outside the eu-west-1 Region, regardless of the users' IAM permissions. Which service should it use?",
    options: [
      "IAM policies attached to each user",
      "Service Control Policies (SCPs) in AWS Organizations",
      "AWS Config rules",
      "Security Groups at the VPC level"
    ],
    correct: 1,
    explanation: "SCPs in AWS Organizations define the maximum permissions for member accounts and can restrict the Regions that can be used, independently of individual IAM policies. AWS Config detects non-compliance after the fact but does not prevent the action. SCPs enforce a preventive, centralized guardrail."
  },
  {
    id: 16, domain: 2,
    q: "An application stores shared files that are accessed concurrently for read/write by dozens of Linux EC2 instances spread across multiple AZs. Which storage solution meets the requirement?",
    options: [
      "An Amazon EBS volume attached to each instance",
      "Amazon EFS mounted on all the instances",
      "An S3 bucket mounted as a file system through a third-party tool",
      "Local instance stores synchronized by a script"
    ],
    correct: 1,
    explanation: "Amazon EFS is a fully managed, shared NFS file system that can be accessed concurrently by many Linux EC2 instances across multiple AZs. EBS (except io2 Multi-Attach, which is limited and same-AZ) cannot be widely shared across instances/AZs. EFS directly meets the multi-AZ sharing requirement."
  },
  {
    id: 17, domain: 3,
    q: "A global REST API is experiencing rapid, unpredictable traffic growth. The company wants a serverless solution that scales automatically without managing servers and is billed by usage. Which combination should it choose?",
    options: [
      "Amazon API Gateway + AWS Lambda",
      "Application Load Balancer + EC2 Auto Scaling group",
      "Amazon EC2 + Elastic IP",
      "Amazon Lightsail"
    ],
    correct: 0,
    explanation: "API Gateway + Lambda forms a fully serverless architecture that scales automatically with traffic, without server management, and is billed per request/invocation. ALB + EC2 requires managing instances. This is the reference model for an API with unpredictable, growing traffic."
  },
  {
    id: 18, domain: 1,
    q: "To meet a compliance requirement, a company must encrypt data in an S3 bucket and retain full control over key rotation and an audit log of every key usage. Which encryption option should it choose?",
    options: [
      "SSE-S3 (keys managed by S3)",
      "SSE-KMS with a customer managed key (CMK)",
      "No encryption, relying on bucket permissions",
      "Client-side encryption with a key hard-coded in the application"
    ],
    correct: 1,
    explanation: "SSE-KMS with a customer managed key lets you control the key policy and rotation, and logs every use through CloudTrail (audit). SSE-S3 does not provide this level of control or key-usage logging. This is the option for strict compliance requirements."
  },
  {
    id: 19, domain: 4,
    q: "A company transfers large volumes of data between EC2 instances and S3 in the same Region. The traffic currently flows through a NAT Gateway, incurring high data processing charges. How can it reduce these costs?",
    options: [
      "Increase the number of NAT Gateways",
      "Create a VPC Gateway Endpoint for S3 so that the traffic does not traverse the NAT Gateway",
      "Move the instances to a public subnet",
      "Enable S3 Transfer Acceleration"
    ],
    correct: 1,
    explanation: "A VPC Gateway Endpoint for S3 lets the instances access S3 over the private AWS network without going through the NAT Gateway, eliminating NAT data processing charges. Gateway Endpoints (S3 and DynamoDB) are free. This is the classic cost optimization for intra-Region S3 traffic."
  },
  {
    id: 20, domain: 2,
    q: "A company wants a disaster recovery plan where a minimal infrastructure runs continuously in a secondary Region and can be quickly scaled up in the event of a disaster. RTO of a few minutes, moderate cost. Which DR strategy matches this?",
    options: [
      "Backup and Restore",
      "Pilot Light",
      "Warm Standby",
      "Multi-site Active-Active"
    ],
    correct: 2,
    explanation: "Warm Standby keeps a scaled-down but fully functional version of the environment running at all times in the secondary Region, ready to be scaled up quickly (RTO in minutes) at a moderate cost. Pilot Light keeps only the core (database) running with compute switched off, giving a longer RTO. Active-Active is the most expensive."
  },
  {
    id: 21, domain: 3,
    q: "An application needs a managed NoSQL database capable of handling millions of requests per second with consistent single-digit millisecond latency, and automatic scaling based on load. Which service should you choose?",
    options: [
      "Amazon RDS for MySQL",
      "Amazon DynamoDB with On-Demand capacity",
      "Amazon Redshift",
      "Amazon Aurora Serverless"
    ],
    correct: 1,
    explanation: "DynamoDB is a fully managed NoSQL database offering single-digit millisecond latency at any scale; On-Demand mode scales automatically without capacity provisioning. RDS and Aurora are relational. Redshift is an analytical data warehouse, not a high-frequency transactional store."
  },
  {
    id: 22, domain: 1,
    q: "A security team needs an immutable, complete log of all API calls made in the AWS account for audit and investigation purposes. Which service provides this?",
    options: [
      "Amazon CloudWatch Metrics",
      "AWS CloudTrail with a trail delivering logs to an S3 bucket",
      "AWS Config",
      "VPC Flow Logs"
    ],
    correct: 1,
    explanation: "CloudTrail records all API calls in the account (who, what, when, from where) and can deliver them to S3 with log file integrity validation for an immutable audit log. CloudWatch monitors metrics, Config tracks resource configuration, and Flow Logs captures network traffic — none of these covers API call auditing."
  },
  {
    id: 23, domain: 3,
    q: "A real-time multiplayer gaming application requires minimal network latency and deterministic routing of player traffic to the nearest application endpoints over the AWS network, with fast regional failover. Which service should you use?",
    options: [
      "Amazon CloudFront",
      "AWS Global Accelerator",
      "Route 53 with geolocation routing",
      "Cross-Region Elastic Load Balancing"
    ],
    correct: 1,
    explanation: "AWS Global Accelerator provides static anycast IP addresses and routes TCP/UDP traffic over the AWS backbone network to the nearest healthy endpoint, with near-instant regional failover — ideal for low-latency real-time workloads. CloudFront is optimized for cached HTTP content, not UDP game traffic."
  },
  {
    id: 24, domain: 4,
    q: "A company wants to run ad hoc analysis of data stored in S3 (Parquet files) using standard SQL, without managing infrastructure or loading the data elsewhere, and pay only per query. Which service should it choose?",
    options: [
      "A provisioned Amazon Redshift cluster",
      "Amazon Athena",
      "Amazon EMR with Spark",
      "Amazon RDS for PostgreSQL"
    ],
    correct: 1,
    explanation: "Amazon Athena queries data directly in S3 using standard SQL, with no server to manage, billed by the data scanned per query — perfect for ad hoc analysis. Redshift and EMR require provisioning and suit more sustained workloads. RDS would require loading the data."
  },
  {
    id: 25, domain: 2,
    q: "A web application's traffic is highly variable: low at night, high during the day with unpredictable spikes. The company wants to maintain availability while avoiding over-provisioning. Which approach do you recommend?",
    options: [
      "Provision a fixed number of instances for the maximum observed peak",
      "Use an Auto Scaling group with dynamic scaling policies based on metrics (e.g., CPU utilization)",
      "Manually restart instances depending on traffic",
      "Use a single large instance with manual vertical scaling"
    ],
    correct: 1,
    explanation: "An Auto Scaling group with dynamic scaling (target tracking on CPU, or predictive scaling) automatically adds/removes instances according to actual demand, maintaining availability while avoiding costly over-provisioning. Provisioning for peak wastes resources at night."
  },
  {
    id: 26, domain: 1,
    q: "A frontend application in a public subnet must communicate with a database in a private subnet. How should the Security Groups be configured following the principle of least privilege?",
    options: [
      "Allow all inbound traffic (0.0.0.0/0) on the database Security Group",
      "On the database SG, allow the database port inbound only from the frontend's Security Group (reference by SG)",
      "Place both in the same Security Group allowing all internal traffic",
      "Allow inbound from the entire VPC CIDR range"
    ],
    correct: 1,
    explanation: "Referencing the frontend's source Security Group as the allowed source on the database port (e.g., 3306) enforces least privilege: only the frontend instances can reach the database, regardless of their IP. Allowing 0.0.0.0/0 or the entire VPC CIDR is too permissive."
  },
  {
    id: 27, domain: 3,
    q: "A streaming analytics workload continuously ingests terabytes of clickstream data that must be processed in near real time by multiple consumers. Which service is designed for this?",
    options: [
      "Amazon SQS Standard",
      "Amazon Kinesis Data Streams",
      "Amazon RDS",
      "AWS Batch"
    ],
    correct: 1,
    explanation: "Kinesis Data Streams is designed for real-time, large-scale ingestion and processing of data streams, with multiple consumers reading the same stream and data retention (replay possible). SQS is a point-to-point message queue without multi-consumer replay of an ordered stream at this scale."
  },
  {
    id: 28, domain: 4,
    q: "A development and test database is only used during business hours (8 a.m.–8 p.m., weekdays). The company wants to reduce costs during idle periods. Which approach is most effective for an RDS instance?",
    options: [
      "Delete the database every evening and recreate it in the morning",
      "Stop the RDS instance outside business hours through automated scheduling",
      "Reduce the storage size every night",
      "Switch to Multi-AZ to reduce costs"
    ],
    correct: 1,
    explanation: "Stopping an RDS instance suspends compute billing (you still pay for storage and snapshots); automating stop/start through EventBridge + Lambda or scheduling windows greatly reduces costs for a workload limited to business hours. Deletion/recreation is risky and complex. Multi-AZ increases costs."
  },
  {
    id: 29, domain: 2,
    q: "A company wants to ensure that critical objects in an S3 bucket cannot be deleted or overwritten during a regulatory retention period, even by an administrator. Which feature should it use?",
    options: [
      "S3 versioning alone",
      "S3 Object Lock in Compliance mode with a retention period",
      "A bucket policy denying deletions",
      "An S3 Lifecycle policy"
    ],
    correct: 1,
    explanation: "S3 Object Lock in Compliance mode enforces the WORM (Write Once Read Many) model: no user, including the root account, can delete or modify the object before the retention period ends — ideal for regulatory compliance. Versioning alone or a bucket policy can be bypassed by an administrator."
  },
  {
    id: 30, domain: 1,
    q: "A company wants to protect a web application exposed through an Application Load Balancer against SQL injection and cross-site scripting (XSS), and to block custom traffic rules. Which service should it use?",
    options: [
      "Amazon GuardDuty",
      "AWS WAF associated with the ALB",
      "AWS Shield Standard only",
      "Network ACLs on the subnets"
    ],
    correct: 1,
    explanation: "AWS WAF associates with the ALB (or CloudFront/API Gateway) and filters HTTP/S traffic based on rules, including managed rules against SQL injection and XSS, as well as custom rules. GuardDuty is threat detection, Shield Standard protects against DDoS, and NACLs filter by IP/port, not application content."
  },
  {
    id: 31, domain: 3,
    q: "An application needs a relational database that automatically starts and stops based on load, with smooth capacity scaling for intermittent and unpredictable workloads. Which service should you choose?",
    options: [
      "Amazon RDS for MySQL on a fixed instance",
      "Amazon Aurora Serverless v2",
      "Amazon DynamoDB",
      "Amazon Redshift"
    ],
    correct: 1,
    explanation: "Aurora Serverless v2 finely and automatically adjusts the relational database's compute capacity based on demand, ideal for variable, intermittent, or unpredictable workloads, without managing instance size. RDS on a fixed instance does not scale automatically. DynamoDB is NoSQL. Redshift is analytical."
  },
  {
    id: 32, domain: 4,
    q: "A company has hundreds of AWS accounts in an organization and wants to benefit from volume pricing and consolidated billing while still tracking costs per account. Which feature provides this?",
    options: [
      "Create a single AWS account shared by all teams",
      "Use AWS Organizations with consolidated billing",
      "Purchase Reserved Instances separately in each account",
      "Request a manual monthly invoice from AWS Support"
    ],
    correct: 1,
    explanation: "AWS Organizations with consolidated billing aggregates usage across all accounts to benefit from aggregated volume discounts and the sharing of Reserved Instances/Savings Plans, while preserving cost visibility per account. A single shared account would lose isolation and per-team tracking."
  },
  {
    id: 33, domain: 2,
    q: "An application on EC2 writes to an SQS queue that is consumed by an Auto Scaling group of workers. How can the workers be scaled automatically based on the amount of pending work?",
    options: [
      "Scale based on the CPU of the frontend web instances",
      "Scale the worker group based on the ApproximateNumberOfMessagesVisible metric of the SQS queue",
      "Maintain a fixed number of workers regardless of load",
      "Scale based on the number of database connections"
    ],
    correct: 1,
    explanation: "Using queue depth (ApproximateNumberOfMessagesVisible), ideally via a backlog-per-instance metric, as the scaling trigger lets you add workers when pending work grows and remove them as the queue empties. Scaling on frontend CPU does not reflect the actual worker load."
  },
  {
    id: 34, domain: 1,
    q: "A company must provide temporary federated access to the AWS console for its employees using its existing corporate identity provider (Active Directory / SAML 2.0). Which approach do you recommend?",
    options: [
      "Create an individual IAM user for each employee",
      "Set up identity federation through IAM Identity Center (or a SAML IAM provider) and assume IAM roles",
      "Share a single IAM user among all employees",
      "Distribute the account root access keys"
    ],
    correct: 1,
    explanation: "Federation through IAM Identity Center / a SAML identity provider lets employees sign in with their existing corporate credentials and assume IAM roles that provide temporary credentials, without managing individual IAM users. Creating individual IAM users or sharing accounts is not scalable or secure."
  },
  {
    id: 35, domain: 3,
    q: "An e-commerce application displays a product catalog that is read very frequently but rarely modified, from a database. The repetitive queries overload the database. Which solution reduces latency and the load on the database?",
    options: [
      "Increase the instance class of the database",
      "Cache the frequently read results in Amazon ElastiCache",
      "Enable database encryption",
      "Migrate the database to a larger volume"
    ],
    correct: 1,
    explanation: "Caching frequently read, rarely modified data in ElastiCache (Redis/Memcached) serves reads at low latency from memory and offloads the database from repetitive queries. Increasing the instance size treats the symptom at a higher cost without the performance of an in-memory cache."
  },
  {
    id: 36, domain: 4,
    q: "A company wants to receive an alert when its monthly AWS spending exceeds a defined threshold, and to track cost forecasts. Which tool should it use?",
    options: [
      "Amazon CloudWatch Logs",
      "AWS Budgets with cost alerts",
      "AWS Trusted Advisor only",
      "VPC Flow Logs"
    ],
    correct: 1,
    explanation: "AWS Budgets lets you define cost/usage budgets and trigger alerts (SNS) when actual or forecasted spending exceeds thresholds, with forecast tracking. CloudWatch Logs and Flow Logs deal with logs, not budget management. Trusted Advisor provides recommendations but not custom budget alerts."
  },
  {
    id: 37, domain: 2,
    q: "An application must process files dropped into S3. Processing must start automatically and immediately for each new object, without periodic polling. Which approach is most efficient?",
    options: [
      "A cron job that lists the bucket every minute",
      "Configure an S3 Event Notification that triggers a Lambda function",
      "Manually check the bucket several times a day",
      "Enable bucket versioning"
    ],
    correct: 1,
    explanation: "S3 Event Notifications automatically trigger a Lambda (or SQS/SNS) as soon as an object is created, providing immediate event-driven processing without polling. Polling with a cron job introduces latency and unnecessary cost. This is the standard serverless event-driven model for processing S3 files."
  },
  {
    id: 38, domain: 3,
    q: "A team wants to migrate a containerized application to AWS without managing servers or a cluster of EC2 instances, paying only for the resources used by the containers. Which compute option should it choose?",
    options: [
      "Amazon ECS on self-managed EC2 instances",
      "AWS Fargate (with ECS or EKS)",
      "Amazon EC2 with Docker installed manually",
      "AWS Elastic Beanstalk on EC2"
    ],
    correct: 1,
    explanation: "AWS Fargate runs containers in a serverless manner: no EC2 instances or cluster to manage, billed by the vCPU/memory allocated to the tasks. ECS/EKS on EC2 requires managing the cluster instances. Fargate is the choice for eliminating server management for containers."
  },
  {
    id: 39, domain: 1,
    q: "A company wants to automatically detect malicious or unauthorized behavior in its AWS environment, such as anomalous API calls or communication with known malicious IPs, without deploying agents. Which service should it use?",
    options: [
      "AWS WAF",
      "Amazon GuardDuty",
      "AWS Certificate Manager",
      "Amazon Inspector"
    ],
    correct: 1,
    explanation: "GuardDuty is a threat detection service that continuously analyzes CloudTrail, VPC Flow Logs, and DNS logs to spot anomalous or malicious activity, with no agent to deploy. Inspector assesses workload vulnerabilities (EC2/ECR/Lambda), WAF filters web traffic, and ACM manages certificates."
  },
  {
    id: 40, domain: 2,
    q: "An RDS database must remain available during a single-AZ failure, with automatic failover and no loss of committed data. Which configuration meets the requirement?",
    options: [
      "A Single-AZ RDS instance with daily snapshots",
      "RDS Multi-AZ (synchronous standby instance in another AZ)",
      "A read replica in the same AZ",
      "A faster EBS volume"
    ],
    correct: 1,
    explanation: "RDS Multi-AZ maintains a synchronous standby instance in another AZ and fails over automatically if the primary AZ fails, with no loss of committed transactions (synchronous replication). Read replicas are asynchronous and intended for read scaling, not automatic lossless failover."
  },
  {
    id: 41, domain: 3,
    q: "A media company must deliver video on demand to a global audience with caching, low latency, and origin protection. The video files are stored in S3. Which architecture should it choose?",
    options: [
      "Serve directly from S3 with public access",
      "Use CloudFront in front of S3 with an Origin Access Control (OAC) restricting direct access to the bucket",
      "Copy the videos to EC2 instances in each Region",
      "Use a NAT Gateway to distribute the videos"
    ],
    correct: 1,
    explanation: "CloudFront caches the video at edge locations for low global latency, and an Origin Access Control (OAC) ensures that the S3 bucket is accessible only through CloudFront (protected origin, no direct public access). Serving S3 publicly provides neither global caching nor origin protection."
  },
  {
    id: 42, domain: 4,
    q: "A company has a stable EC2 production workload but wants to avoid the full upfront payment commitment of Reserved Instances. It accepts a term commitment but prefers low upfront cost. Which Savings Plan / RI option should it favor?",
    options: [
      "All Upfront Reserved Instances",
      "A Savings Plan or Reserved Instances with the No Upfront option",
      "Spot Instances",
      "On-Demand Dedicated Hosts"
    ],
    correct: 1,
    explanation: "The No Upfront option (available for Savings Plans and Reserved Instances) provides a discount on a 1- or 3-year commitment with no upfront payment, paid monthly — less discount than All Upfront but no initial outlay. Spot is not suitable for a stable production workload requiring continuous availability."
  },
  {
    id: 43, domain: 1,
    q: "A Lambda application must access resources in a VPC (such as a private RDS database) and also call S3. Which configuration allows Lambda to access S3 without routing the traffic through the internet/NAT?",
    options: [
      "Give Lambda a public IP address",
      "Configure Lambda in the VPC and create a VPC Gateway Endpoint for S3",
      "Make the S3 bucket public",
      "Disable Lambda's VPC integration"
    ],
    correct: 1,
    explanation: "When Lambda is attached to a VPC to reach RDS, a VPC Gateway Endpoint for S3 lets it access S3 over the private AWS network without a NAT Gateway or internet access, which is more secure and less costly. Giving it a public IP or making the bucket public degrades security."
  },
  {
    id: 44, domain: 2,
    q: "A company wants to automatically replicate objects from an S3 bucket in one Region to a bucket in another Region for compliance and disaster recovery. Which feature should it use?",
    options: [
      "S3 Lifecycle policy",
      "S3 Cross-Region Replication (CRR)",
      "S3 Transfer Acceleration",
      "Manually copy the objects every week"
    ],
    correct: 1,
    explanation: "S3 Cross-Region Replication (CRR) automatically and asynchronously replicates objects to a bucket in another Region, meeting compliance and geographic DR requirements. Lifecycle policies manage storage class transitions and expiration, not cross-Region replication."
  },
  {
    id: 45, domain: 3,
    q: "An application needs to share a large read-only dataset among hundreds of Lambda functions and EC2 instances with high throughput, and the dataset is updated daily. Which storage solution offers the best shared throughput?",
    options: [
      "Include the dataset in each Lambda deployment package",
      "Store the dataset in S3 and read it on demand (with optional caching)",
      "Store the dataset in an RDS database and query it",
      "Copy the dataset to an EBS volume per instance"
    ],
    correct: 1,
    explanation: "S3 offers high, massively parallel, shared throughput, accessible by hundreds of Lambda/EC2 simultaneously, and is easily updated by replacing the object daily. Including the dataset in each Lambda package is unmanageable for large volumes; an EBS volume is not widely shareable."
  }
];
