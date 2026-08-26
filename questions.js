// questions.js — Full question bank for the AWS SAA-C03 practice tool
// Domains: 1=Secure (30%), 2=Resilient (26%), 3=High-Performing (24%), 4=Cost-Optimized (20%)
// ts = exam-guide task statement (1.1 … 4.4)
// 300 questions — D1:90 D2:78 D3:72 D4:60
const QUESTIONS = [
  {
    "id": 1,
    "domain": 1,
    "ts": "1.3",
    "q": "A healthcare company runs an application on Amazon EC2 instances that are registered with an internet-facing Application Load Balancer. The load balancer already terminates HTTPS with a public certificate from AWS Certificate Manager. A new policy requires that the traffic also be encrypted on the connection between the load balancer and the EC2 instances. Which solution meets these requirements?",
    "options": [
      "Install a certificate and its private key on each EC2 instance, and configure the target group to use the HTTPS protocol so that the load balancer opens TLS connections to the targets.",
      "Change the HTTPS listener to a security policy that requires TLS 1.3 for connections from clients, so that the traffic is protected with the newest protocol version along the whole path.",
      "Change the instances' security group so that it accepts traffic on port 80 only from the security group of the load balancer, and denies every other source, leaving the target group protocol set to HTTP.",
      "Enable mutual authentication (mTLS) on the HTTPS listener of the load balancer with a trust store that validates the certificates the clients present, built from a certificate bundle stored in S3."
    ],
    "correct": 0,
    "explanation":
      "When the target group protocol is HTTPS, the load balancer establishes TLS connections with the targets by using the certificates installed on them, which encrypts the second leg of the path. The load balancer does not validate those certificates, so a private or self-signed certificate on the instances is enough. A stricter listener security policy applies to the connection between the clients and the load balancer, which is already encrypted. Restricting the instances' security group to the load balancer's security group controls who may connect on port 80, not whether that traffic is encrypted. Mutual authentication makes clients present certificates on the front-end connection and leaves the connection to the targets unchanged."
  },
  {
    "id": 5,
    "domain": 1,
    "ts": "1.1",
    "q": "A company runs an application on AWS Lambda. The function must connect to an Amazon RDS DB instance in a private VPC by using credentials that are held in AWS Secrets Manager. The security team requires that the credential values never be stored in the function code or in the function configuration. Which solution meets these requirements?",
    "options": [
      "Grant the function's execution role permission to call secretsmanager:GetSecretValue on the secret, and have the function retrieve the secret at invocation time.",
      "Copy the secret value into the function’s environment variables and encrypt the environment variables with an AWS KMS customer managed key.",
      "Create an IAM user that can read the secret, and store the user’s access keys as a SecureString parameter in AWS Systems Manager Parameter Store that the function reads at startup.",
      "Attach a resource-based policy to the secret that grants access to the lambda.amazonaws.com service principal, and remove the Secrets Manager permissions from the function’s execution role."
    ],
    "correct": 0,
    "explanation":
      "The Lambda execution role supplies temporary credentials to the function, so granting that role secretsmanager:GetSecretValue lets the function fetch the credentials at runtime with nothing stored in code or configuration. Encrypted environment variables still place the credential value in the function configuration, where anyone with lambda:GetFunctionConfiguration and the key permission can read it. Storing IAM user access keys reintroduces the long-term credentials the team wants to eliminate. A resource-based policy on the secret only widens who may access it; the caller is still the execution role, so removing the role permission breaks the call."
  },
  {
    "id": 8,
    "domain": 1,
    "ts": "1.1",
    "q": "An application that runs on Amazon EC2 instances must read objects from an Amazon S3 bucket. Company policy prohibits storing long-term AWS credentials on the instances, and the permissions must apply to every instance that the Auto Scaling group launches. What should a solutions architect do to accomplish this?",
    "options": [
      "Create an IAM user with a policy that allows access to the bucket, and place its access keys in the AWS credentials file on each instance through the user data script.",
      "Create an IAM user with a policy that allows access to the bucket, store its access keys in AWS Secrets Manager, and have the application fetch the keys at startup.",
      "Create an IAM role with a policy that allows access to the bucket, and attach the role to the instances through an instance profile referenced by the launch template.",
      "Add a bucket policy that allows s3:GetObject when the aws:SourceIp condition key matches the public IP addresses of the instances."
    ],
    "correct": 2,
    "explanation":
      "An instance profile delivers temporary, automatically rotated credentials to every instance the launch template starts, and the application picks them up through the instance metadata service without any stored secret. Both IAM user options keep long-term access keys in play, whether they sit in a credentials file or are fetched from Secrets Manager. An aws:SourceIp bucket policy grants access based on the network path rather than an identity, and the addresses change every time the Auto Scaling group replaces an instance."
  },
  {
    "id": 11,
    "domain": 1,
    "ts": "1.2",
    "q": "A company must place sensitive resources in a VPC subnet where the resources cannot be reached from the internet and are not assigned public IP addresses. The resources must still be able to download operating system patches from vendor repositories on the internet. Which solution meets these requirements?",
    "options": [
      "Launch the resources in a private subnet, and add a route for 0.0.0.0/0 that points to a NAT gateway in a public subnet.",
      "Launch the resources in a public subnet, and configure the security groups with outbound rules only.",
      "Launch the resources in a private subnet, and create a gateway VPC endpoint that points to the vendor repositories.",
      "Launch the resources in a private subnet, and add a route for 0.0.0.0/0 that points to an egress-only internet gateway."
    ],
    "correct": 0,
    "explanation":
      "A NAT gateway in a public subnet performs source network address translation for outbound IPv4 traffic, so the private instances can reach vendor repositories while unsolicited inbound connections from the internet have no path to them and no public IP is needed. A public subnet only provides internet access to instances that carry a public or Elastic IP address, which the requirements forbid. Gateway VPC endpoints exist only for Amazon S3 and Amazon DynamoDB and cannot target an arbitrary internet endpoint. An egress-only internet gateway provides outbound access for IPv6 traffic only, so it does not cover IPv4 repository downloads."
  },
  {
    "id": 15,
    "domain": 1,
    "ts": "1.1",
    "q": "A company manages many accounts in AWS Organizations. The company must guarantee that resources cannot be created outside the eu-west-1 Region in any current or future member account, and administrators inside the member accounts must not be able to bypass the restriction. Which solution meets these requirements?",
    "options": [
      "Attach an IAM policy that denies actions when aws:RequestedRegion is not eu-west-1 to every IAM user and role in each member account.",
      "Attach a service control policy that denies all actions when aws:RequestedRegion is not eu-west-1 to the organization root.",
      "Create an AWS Config rule that reports resources created outside eu-west-1 and notifies the security team through Amazon SNS.",
      "Create an IAM permissions boundary that limits actions to eu-west-1 and attach it to every role in each member account."
    ],
    "correct": 1,
    "explanation":
      "A service control policy attached to the organization root sets the maximum available permissions for every member account, including accounts added later, and an account administrator cannot alter it because it is managed from the organization. Identity-based policies and permissions boundaries live inside the member account, so a local administrator with IAM permissions can detach or edit them. An AWS Config rule is a detective control that reports the violation after the resource already exists."
  },
  {
    "id": 18,
    "domain": 1,
    "ts": "1.3",
    "q": "To satisfy a compliance requirement, a company must encrypt objects in an Amazon S3 bucket. The company must define the key policy, control the rotation schedule of the key, and be able to review a record of every cryptographic operation performed with the key. Which solution meets these requirements?",
    "options": [
      "Use server-side encryption with Amazon S3 managed keys (SSE-S3) on the bucket.",
      "Use server-side encryption with customer-provided keys (SSE-C) and hold the keys in an on-premises key server.",
      "Use server-side encryption with an AWS KMS customer managed key.",
      "Use server-side encryption with the AWS managed key aws/s3."
    ],
    "correct": 2,
    "explanation":
      "A customer managed KMS key is the only option where the company writes the key policy, chooses whether and when rotation happens, and sees every Encrypt, Decrypt, and GenerateDataKey call recorded in AWS CloudTrail. SSE-S3 keys are handled entirely by Amazon S3 and expose no key policy or usage record. SSE-C moves key custody to the company but Amazon S3 discards the key after each request, so there is no AWS-side key policy or rotation control. The AWS managed key aws/s3 does log its use, but its key policy and rotation schedule are controlled by AWS and cannot be changed."
  },
  {
    "id": 22,
    "domain": 1,
    "ts": "1.1",
    "q": "A security team must be able to reconstruct who called which AWS API, when, and from which source address across every Region in an account, and must be able to prove that the stored records have not been altered. Which solution meets these requirements?",
    "options": [
      "Enable VPC Flow Logs on all VPCs in the account, and deliver the records to Amazon CloudWatch Logs so that the source address of every request is retained.",
      "Enable AWS Config in every Region of the account, and record all of the supported resource types in each one, storing the configuration snapshots in a dedicated Amazon S3 bucket.",
      "Create an Amazon CloudWatch Logs log group, and stream the application logs from every instance in the account to it using the CloudWatch agent, with a 90-day retention period.",
      "Create an AWS CloudTrail trail that applies to all Regions, deliver the log files to an Amazon S3 bucket, and enable log file integrity validation."
    ],
    "correct": 3,
    "explanation":
      "A multi-Region CloudTrail trail records the identity, action, time, and source IP address of API calls and delivers them to Amazon S3; log file integrity validation produces signed digest files that let the team detect any modification or deletion of a delivered log file. VPC Flow Logs describe IP traffic, not API calls. AWS Config records the resulting configuration state of resources rather than the full call history. Application logs in CloudWatch Logs contain whatever the application writes and say nothing about control plane activity."
  },
  {
    "id": 26,
    "domain": 1,
    "ts": "1.2",
    "q": "A company runs web servers in an Auto Scaling group in public subnets and an Amazon RDS DB instance in private subnets. The instances are replaced frequently, so their private IP addresses change. Access to the database port must be restricted to the web tier only. Which solution meets these requirements?",
    "options": [
      "On the DB instance's security group, add an inbound rule for the database port that specifies the web tier's security group as the source.",
      "On the DB instance's security group, add an inbound rule for the database port that specifies the VPC CIDR block as the source.",
      "On the DB instance's security group, add an inbound rule for the database port that specifies the public subnet CIDR blocks in every Availability Zone as the source.",
      "On the network ACL of the private subnets, add an inbound rule that allows the database port from the public subnet CIDR blocks."
    ],
    "correct": 0,
    "explanation":
      "Referencing the web tier security group as the source resolves to whichever elastic network interfaces currently carry that group, so the rule keeps working as the Auto Scaling group replaces instances and it grants access to nothing else. The VPC CIDR block also covers every other subnet in the VPC. The public subnet CIDR blocks cover any resource placed in those subnets, not only the web tier, and network ACLs likewise match on address ranges rather than on group membership."
  },
  {
    "id": 30,
    "domain": 1,
    "ts": "1.2",
    "q": "A company must protect a web application that is exposed through an Application Load Balancer from SQL injection and cross-site scripting attempts, and must also be able to block requests that match company-specific patterns in headers and query strings. Which solution meets these requirements?",
    "options": [
      "Enable Amazon GuardDuty, and create an Amazon EventBridge rule that adds the source IP address of an offending request to a deny list on the load balancer subnets so that repeat attempts are dropped.",
      "Create an AWS WAF web ACL that contains the AWS managed rule groups for SQL database and the core rule set together with custom rules, and associate the web ACL with the Application Load Balancer.",
      "Subscribe to AWS Shield Advanced, and enable automatic application layer DDoS mitigation for the Application Load Balancer.",
      "Create a network ACL on the load balancer subnets that denies any request whose contents include SQL keywords."
    ],
    "correct": 1,
    "explanation":
      "AWS WAF inspects HTTP and HTTPS requests at layer 7 and can be associated directly with an Application Load Balancer; the AWS managed rule groups cover SQL injection and cross-site scripting, and custom rules match on headers, query strings, and other request components. GuardDuty produces findings from log analysis and does not inspect or block individual requests. Shield Advanced focuses on DDoS mitigation rather than on injection patterns. Network ACLs evaluate IP addresses, protocols, and ports and cannot look inside the HTTP payload."
  },
  {
    "id": 34,
    "domain": 1,
    "ts": "1.1",
    "q": "A continuous integration pipeline runs in a tooling AWS account and must deploy an AWS CloudFormation stack into a separate production account owned by the same organization. The security team refuses to create any long-lived credentials for the production account and wants the production account to keep control of what the pipeline is allowed to do. Which solution meets these requirements?",
    "options": [
      "Create an IAM role in the production account that trusts the tooling account, grant it the deployment permissions, and have the pipeline call AWS STS AssumeRole to obtain temporary credentials.",
      "Create an IAM user in the production account, generate a long-lived access key for it, and store that key in AWS Secrets Manager in the tooling account so that the pipeline reads it at deployment time.",
      "Add the production account to the trusted account list of the pipeline execution role in the tooling account, attach the required CloudFormation deployment permissions to that role, and deploy the stack directly.",
      "Create an AWS Resource Access Manager share so that the tooling account is able to create resources inside the production account."
    ],
    "correct": 0,
    "explanation":
      "A cross-account IAM role is the documented pattern: the production account creates a role whose trust policy names the tooling account, attaches the permissions the deployment needs, and the pipeline calls AWS STS AssumeRole to receive credentials that expire. The production account keeps both the trust relationship and the permissions, and nothing long-lived is issued. An IAM user with an access key is exactly the long-lived credential the security team refuses, and storing it in Secrets Manager only moves it. Trust relationships are declared on the role being assumed, not on the caller role, so adding the production account to the pipeline role changes nothing. AWS RAM shares specific resources such as subnets or transit gateways between accounts; it does not grant permission to create CloudFormation stacks."
  },
  {
    "id": 39,
    "domain": 1,
    "ts": "1.2",
    "q": "A company wants continuous detection of suspicious activity in its AWS accounts, such as calls from anomalous locations, communication with known malicious IP addresses, and cryptocurrency mining. The solution must not require agents on the instances or changes to the workloads. Which solution meets these requirements?",
    "options": [
      "Deploy Amazon Inspector and enable continuous vulnerability scanning of the EC2 instances.",
      "Enable AWS Security Hub and turn on the AWS Foundational Security Best Practices standard.",
      "Create Amazon CloudWatch Logs metric filters on the CloudTrail log group and raise alarms on unusual API calls.",
      "Enable Amazon GuardDuty in all Regions and review the findings it generates."
    ],
    "correct": 3,
    "explanation":
      "GuardDuty consumes CloudTrail management events, VPC flow logs, and DNS query logs directly from the AWS side, so it produces threat findings such as cryptocurrency mining and communication with known malicious addresses without any agent or workload change. Amazon Inspector reports software vulnerabilities and network reachability rather than active malicious behavior. Security Hub aggregates and scores findings that other services generate. Metric filters can alert on patterns the team thinks to write in advance, which does not cover threat intelligence or anomaly detection."
  },
  {
    "id": 43,
    "domain": 1,
    "ts": "1.2",
    "q": "An AWS Lambda function is attached to private subnets in a VPC so that it can reach an Amazon RDS DB instance. The function also writes objects to an Amazon S3 bucket in the same Region, and that traffic must stay on the AWS network. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Create a gateway VPC endpoint for Amazon S3 and add a route to it in the route tables of the subnets that the function uses.",
      "Create an interface VPC endpoint for Amazon S3 in the subnets that the function uses and enable private DNS.",
      "Deploy a NAT gateway in a public subnet and route the outbound traffic of the private subnets to it.",
      "Remove the function from the VPC so that it reaches Amazon S3 over the Lambda service network."
    ],
    "correct": 0,
    "explanation":
      "A gateway VPC endpoint for Amazon S3 adds a prefix list route to the subnet route tables, keeps the traffic inside the AWS network, and carries no additional charge. An interface endpoint for Amazon S3 also keeps the traffic private, but it is a billed AWS PrivateLink resource. A NAT gateway sends the traffic out through the internet gateway and bills for both hours and data processed. Detaching the function from the VPC would break its access to the DB instance in the private subnets."
  },
  {
    "id": 101,
    "domain": 1,
    "ts": "1.1",
    "q": "A company runs an application as Amazon ECS tasks on AWS Fargate. The containers must read and write objects in an Amazon S3 bucket. The security team prohibits storing AWS credentials in the task definition, in the container image, or in the application configuration. Which solution meets these requirements?",
    "options": [
      "Attach an IAM role to the container instances of the cluster through an instance profile, and let the containers obtain credentials from the instance metadata service.",
      "Store access keys in AWS Secrets Manager and inject them into the containers as environment variables through the task definition.",
      "Add the Amazon S3 permissions to the task execution role that Amazon ECS uses to pull the container images and write the logs.",
      "Create an IAM role that grants the Amazon S3 permissions and that trusts ecs-tasks.amazonaws.com, and reference it as the task role in the task definition."
    ],
    "correct": 3,
    "explanation":
      "The task role is the role whose permissions Amazon ECS vends to the containers in the task, and the containers pick the temporary credentials up through the container credentials endpoint without any stored secret. On Fargate, EC2 instance profiles are not available to the containers, so an instance profile cannot deliver these permissions. Injecting access keys from Secrets Manager still puts a long-term credential inside the container's environment. The task execution role is used by the Amazon ECS and Fargate agents to pull images and send logs, not by the application code, so granting it Amazon S3 permissions does not give the containers access."
  },
  {
    "id": 102,
    "domain": 1,
    "ts": "1.3",
    "q": "A company stores regulated files in an Amazon S3 bucket and encrypts them with one specific customer managed AWS KMS key. Several teams upload objects to the bucket. Any upload request that names a different AWS KMS key must be rejected at the time of the request rather than corrected afterwards. Which solution meets these requirements?",
    "options": [
      "Turn on default encryption for the bucket with the customer managed key, so that uploads that do not name a key are encrypted with it.",
      "Add a bucket policy statement that denies s3:PutObject when the s3:x-amz-server-side-encryption-aws-kms-key-id condition key does not match the ARN of the customer managed key.",
      "Enable an AWS Config rule that reports buckets whose default encryption does not use the customer managed key, and attach an AWS Systems Manager Automation remediation to it.",
      "Run an Amazon S3 Batch Operations copy job on a schedule that rewrites the objects of the bucket with the customer managed key."
    ],
    "correct": 1,
    "explanation":
      "The s3:x-amz-server-side-encryption-aws-kms-key-id condition key carries the KMS key ARN that the request asks for, so a bucket policy that denies s3:PutObject when that value does not match the key ARN makes Amazon S3 refuse the upload itself. Default encryption applies only when the request names no key, so it does not stop a team from uploading with another KMS key. An AWS Config rule evaluates the bucket configuration after the fact and reports rather than blocks individual uploads. A Batch Operations copy job re-encrypts objects that are already stored, which is a correction rather than a rejection."
  },
  {
    "id": 103,
    "domain": 1,
    "ts": "1.1",
    "q": "A company uses AWS Organizations with member accounts grouped into organizational units. The security team must ensure that no principal in a member account, including a local administrator, can stop or delete the CloudTrail trails in that account. Which solution meets these requirements?",
    "options": [
      "Create a service control policy that denies cloudtrail:StopLogging, cloudtrail:DeleteTrail, and cloudtrail:UpdateTrail, and attach it to the organizational units.",
      "Attach an IAM permissions boundary that denies the CloudTrail management actions to every role in the member accounts, and require that any new role is created with it attached.",
      "Create an AWS Config rule that checks whether CloudTrail logging is enabled in the account, and that sends a notification to the security team's Amazon SNS topic when a trail is disabled.",
      "Enable CloudTrail log file integrity validation, and store the digest files in a separate AWS account."
    ],
    "correct": 0,
    "explanation":
      "A service control policy caps the permissions of every principal in the accounts under the organizational unit, so even an account administrator receives an explicit deny for the CloudTrail management actions. A permissions boundary is an IAM object inside the member account that a local administrator can detach. An AWS Config rule reports the problem after logging has already stopped. Log file integrity validation proves that delivered files were not tampered with but does nothing to keep the trail running."
  },
  {
    "id": 104,
    "domain": 1,
    "ts": "1.3",
    "q": "An application connects to an Amazon RDS for MySQL DB instance with a password that must be changed every 30 days. The company does not want to build or maintain custom rotation code. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Store the password as a SecureString parameter in AWS Systems Manager Parameter Store and rotate it with a Lambda function that the company writes and schedules.",
      "Store the credentials in AWS Secrets Manager and turn on rotation for the Amazon RDS DB instance with a 30-day schedule, using the rotation function that Secrets Manager provides.",
      "Store the password in an object in Amazon S3 encrypted with an AWS KMS key and replace the object on a schedule.",
      "Store the password as an advanced-tier parameter in Parameter Store and attach a parameter policy that expires the value after 30 days."
    ],
    "correct": 1,
    "explanation":
      "When rotation is turned on for a database secret, Secrets Manager creates the rotation Lambda function from an AWS template and sets the permissions of its execution role, so the company writes no rotation code; the function then changes the password on the DB instance and updates the secret on the schedule the company sets. Rotating a Parameter Store value requires the company to build and operate the Lambda function that performs the change on both sides. Replacing an object in Amazon S3 does not update the database password. A parameter policy can expire or notify on a parameter, but it does not generate a new password or apply it to the DB instance."
  },
  {
    "id": 105,
    "domain": 1,
    "ts": "1.2",
    "q": "A company runs a payment application on an Amazon Aurora PostgreSQL DB cluster. The security team must be alerted when an unfamiliar actor signs in to the database or when someone repeatedly guesses a database password. The solution must not require an agent or a change to the database. Which solution meets these requirements?",
    "options": [
      "Enable RDS Protection in Amazon GuardDuty so that GuardDuty profiles the login activity of the DB cluster and generates findings.",
      "Turn on Database Activity Streams for the DB cluster and write an AWS Lambda function that inspects the stream for suspicious logins.",
      "Publish the PostgreSQL log files to Amazon CloudWatch Logs and create metric filters that match failed authentication messages.",
      "Enable Amazon Inspector for the account so that it scans the DB cluster continuously for vulnerabilities."
    ],
    "correct": 0,
    "explanation":
      "GuardDuty RDS Protection analyzes and profiles login activity for supported Aurora databases, including Aurora PostgreSQL, and raises findings for anomalous logins and brute-force attempts. It collects the login activity from the service side, so it needs no agent and no change to the database. Database Activity Streams delivers the activity to the company, which then has to build and operate the detection logic itself. Metric filters match only the patterns the team writes in advance and provide no behavioral baseline. Amazon Inspector reports software vulnerabilities in workloads such as EC2 instances, container images, and Lambda functions, not suspicious database logins."
  },
  {
    "id": 106,
    "domain": 1,
    "ts": "1.1",
    "q": "Developers who work in a development AWS account must read objects from an Amazon S3 bucket that is owned by a production AWS account. The company does not want to create IAM users in the production account and does not want the bucket to be reachable by anyone else. Which solution meets these requirements?",
    "options": [
      "Create an IAM user in the production account with read access to the bucket, generate a long-lived access key for it, and share that key with each of the developers who work in the development account.",
      "Grant read access to the bucket with a bucket ACL that grants READ to the AuthenticatedUsers group of every AWS account.",
      "Configure S3 Replication to copy the objects into a new bucket that the development account owns, and have the developers read from that replica bucket rather than from the bucket in the production account.",
      "Create an IAM role in the production account whose trust policy allows the development account, grant the role read access to the bucket, and have the developers call sts:AssumeRole."
    ],
    "correct": 3,
    "explanation":
      "A cross-account role gives developers temporary credentials that expire, keeps the permissions and the trust decision in the production account, and creates no IAM user there. Sharing access keys hands out a long-term credential that cannot be scoped to individual developers. The AuthenticatedUsers group in a bucket ACL represents every AWS account, so granting it READ lets any authenticated AWS user in the world read the bucket. Replicating the objects duplicates the data and its storage cost instead of granting access to the original bucket."
  },
  {
    "id": 107,
    "domain": 1,
    "ts": "1.2",
    "q": "Servers in a company's data center reach a VPC over an AWS Direct Connect connection. Those on-premises servers must read objects from an Amazon S3 bucket in the same Region as the VPC. The requests must be addressed to private IP addresses inside the VPC and must not leave through an internet gateway. Which solution meets these requirements?",
    "options": [
      "Create a gateway VPC endpoint for Amazon S3 and associate it with the route tables of the VPC subnets.",
      "Create a gateway VPC endpoint for Amazon S3 and advertise the Amazon S3 prefix list to the data center over the Direct Connect connection.",
      "Deploy a NAT gateway in a public subnet of the VPC and route the requests from the data center to Amazon S3 through it.",
      "Create an interface VPC endpoint for Amazon S3 in the VPC and have the on-premises servers send their requests to that endpoint."
    ],
    "correct": 3,
    "explanation":
      "An interface VPC endpoint is backed by elastic network interfaces that hold private IP addresses from the VPC subnets, and AWS documents that these endpoints are directly accessible from applications that are on premises over Direct Connect or Site-to-Site VPN. A gateway endpoint resolves to the public IP addresses of Amazon S3 and works only from the subnets whose route tables it is associated with; it does not allow access from on premises, and its prefix list route cannot be extended to the data center. A NAT gateway sends the requests to the public Amazon S3 endpoint through the internet gateway and adds hourly and data processing charges."
  },
  {
    "id": 108,
    "domain": 1,
    "ts": "1.2",
    "q": "A company allows a set of partner office IP address ranges to reach its applications through about thirty security groups spread over several VPCs in one AWS Region. Whenever a partner office is added or renumbered, an engineer edits every security group by hand and some rules are missed. The list of ranges must be maintained in one place. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Create an AWS Config rule that detects security groups that are missing the current partner ranges, and attach an AWS Systems Manager Automation remediation that adds the rules.",
      "Replace the security group rules with network ACL entries on the application subnets and maintain the partner ranges in those network ACLs.",
      "Create a customer-managed prefix list that contains the partner ranges, and reference that prefix list in the security group rules instead of the individual CIDR blocks.",
      "Store the partner ranges in an Amazon S3 object and run a scheduled AWS Lambda function that reads the object and updates every security group through the Amazon EC2 API."
    ],
    "correct": 2,
    "explanation":
      "A customer-managed prefix list is a named set of CIDR blocks that security group rules can reference instead of listing the ranges individually. When an entry is added or removed, every security group that references the prefix list uses the new version, so a single edit updates all of the rules. An AWS Config rule with an Automation remediation and a scheduled Lambda function both keep the duplicated rules and add code or configuration for the company to operate. Network ACLs cannot reference prefix lists, are evaluated per subnet, and are stateless, so moving the ranges there spreads the same maintenance over another set of resources."
  },
  {
    "id": 109,
    "domain": 1,
    "ts": "1.2",
    "q": "A company serves a global web application through an Amazon CloudFront distribution with an Application Load Balancer as the origin. Requests that contain SQL injection or cross-site scripting payloads must be rejected as close to the viewer as possible, before they reach the origin. Which solution meets these requirements?",
    "options": [
      "Associate an AWS WAF web ACL that contains the AWS managed rule groups for SQL database and the core rule set with the Application Load Balancer that serves as the origin.",
      "Enable AWS Shield Standard on the CloudFront distribution so that the malicious requests are dropped at the edge location, at no additional charge to the account.",
      "Associate an AWS WAF web ACL that contains the AWS managed rule groups for SQL database and the core rule set with the CloudFront distribution.",
      "Create a CloudFront function that inspects the body of each request and rejects the malicious payloads at the edge, running in the lightweight JavaScript runtime."
    ],
    "correct": 2,
    "explanation":
      "A web ACL associated with the CloudFront distribution is evaluated at the edge location that receives the request, so blocked requests never travel to the origin. The SQL database rule group carries the SQL injection rules and the core rule set carries the CrossSiteScripting rules, so together they cover both payload types. Associating the same web ACL with the load balancer would inspect requests only after CloudFront forwarded them to the origin. Shield Standard provides automatic protection against common network and transport layer DDoS attacks and does not inspect request content. CloudFront Functions run in a lightweight environment that has no access to the request body, so they cannot inspect payloads."
  },
  {
    "id": 110,
    "domain": 1,
    "ts": "1.3",
    "q": "A company must inventory the personally identifiable information that is stored across its Amazon S3 buckets and receive findings that identify which objects contain it. Which solution meets these requirements?",
    "options": [
      "Enable Amazon Macie and configure sensitive data discovery jobs against the buckets.",
      "Enable Amazon GuardDuty S3 Protection for the account.",
      "Create an AWS Config rule that checks whether the buckets have default encryption enabled.",
      "Enable Amazon S3 Inventory reports and analyze them with Amazon Athena."
    ],
    "correct": 0,
    "explanation":
      "Macie inspects the contents of Amazon S3 objects with managed and custom data identifiers and produces sensitive data findings that name the bucket, the object, and the type of data found. GuardDuty S3 Protection analyzes S3 data events for suspicious access patterns without looking at object contents. An AWS Config encryption rule evaluates bucket configuration, not what the objects contain. S3 Inventory lists object metadata such as size, encryption status, and storage class, and never opens the objects."
  },
  {
    "id": 111,
    "domain": 1,
    "ts": "1.3",
    "q": "A company terminates TLS for its public websites on an Amazon CloudFront distribution and on an Application Load Balancer. Certificate renewal must happen automatically. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Purchase certificates from a third-party certificate authority, import them into AWS Certificate Manager before each expiry, and associate the new certificates with the distribution and the load balancer every year.",
      "Request public certificates in AWS Certificate Manager, requesting the CloudFront certificate in the US East (N. Virginia) Region, and associate them with the distribution and the load balancer.",
      "Issue certificates from AWS Private Certificate Authority using a certificate authority created in the account, and associate them with the CloudFront distribution and the Application Load Balancer listener.",
      "Generate the certificates in AWS CloudHSM, and install them on the origin Amazon EC2 instances behind the load balancer."
    ],
    "correct": 1,
    "explanation":
      "ACM renews the public certificates that it issues automatically while they remain associated with an integrated service, so nothing has to be tracked or replaced by hand. A certificate used with CloudFront must be requested in the US East (N. Virginia) Region, while the load balancer certificate is requested in the load balancer Region. Imported third-party certificates are not renewed by ACM and must be reimported each time. AWS Private CA issues certificates that public browsers do not trust. Certificates generated in CloudHSM and installed on the origin do not secure the CloudFront or load balancer listener."
  },
  {
    "id": 112,
    "domain": 1,
    "ts": "1.3",
    "q": "A regulation requires a company to generate and store its encryption keys in dedicated, single-tenant hardware security modules over which it retains exclusive control, including the ability to create and manage its own HSM users. Which solution meets these requirements?",
    "options": [
      "Use AWS KMS with an AWS managed key.",
      "Use AWS KMS with a customer managed key and enable automatic key rotation.",
      "Use AWS Secrets Manager with a customer managed KMS key to protect the key material.",
      "Deploy an AWS CloudHSM cluster and manage its HSM users and keys directly."
    ],
    "correct": 3,
    "explanation":
      "CloudHSM gives the company a cluster of dedicated, single-tenant HSMs in its own VPC; AWS operates the hardware but has no access to the key material, and the company creates and manages the HSM users itself. AWS KMS is a multi-tenant service where AWS manages the underlying HSM fleet and there are no customer-managed HSM users, whether the key is AWS managed or customer managed. Secrets Manager stores secret values and does not provide hardware security modules."
  },
  {
    "id": 113,
    "domain": 1,
    "ts": "1.2",
    "q": "A company is building a mobile application. Users must be able to sign in with their existing Google or Facebook accounts, and after sign-in the application must obtain temporary AWS credentials so that it can upload objects to Amazon S3 on the user’s behalf. Which solution meets these requirements?",
    "options": [
      "Configure AWS IAM Identity Center with an external SAML identity provider, and assign a permission set to each of the application users that grants write access to the Amazon S3 bucket that receives the uploads.",
      "Create an IAM user for each application user, and embed the access keys of that user in the mobile application when the user first signs in.",
      "Create an Amazon Cognito user pool with Google and Facebook configured as identity providers, and use an Amazon Cognito identity pool to exchange the resulting tokens for temporary AWS credentials.",
      "Create a SAML identity provider in IAM for Google and Facebook, and have the mobile application directly call sts:AssumeRoleWithSAML with the resulting SAML assertion to obtain the temporary credentials."
    ],
    "correct": 2,
    "explanation":
      "A Cognito user pool handles sign-in and federation with social identity providers, and a Cognito identity pool exchanges the resulting token for temporary AWS credentials scoped to an IAM role, which is exactly the flow the application needs. IAM Identity Center is built for workforce access to AWS accounts and applications, not for consumer sign-up. Embedding IAM user access keys in a mobile application exposes long-term credentials on every device. Google and Facebook are OpenID Connect providers rather than SAML providers, so sts:AssumeRoleWithSAML does not apply."
  },
  {
    "id": 114,
    "domain": 1,
    "ts": "1.3",
    "q": "A company must ensure that none of its Amazon S3 buckets can serve data publicly, even if a bucket owner later applies a permissive ACL or bucket policy. The control must apply to buckets that are created in the future. Which solution meets these requirements?",
    "options": [
      "Enable all four S3 Block Public Access settings at the account level.",
      "Set the object ownership setting of every bucket to Bucket owner enforced so that ACLs are disabled.",
      "Attach a bucket policy to each bucket that denies s3:GetObject when aws:PrincipalAccount does not match the account ID.",
      "Create an AWS Config rule that detects publicly readable buckets and notifies the security team."
    ],
    "correct": 0,
    "explanation":
      "Account-level S3 Block Public Access settings override bucket ACLs and bucket policies for every bucket in the account, including buckets created later, so a permissive setting applied afterwards has no effect. Disabling ACLs with Bucket owner enforced stops ACL-based public grants but leaves bucket policies able to grant public access. A per-bucket policy has to be written and maintained for each new bucket. An AWS Config rule reports the exposure after the fact instead of preventing it."
  },
  {
    "id": 115,
    "domain": 1,
    "ts": "1.2",
    "q": "A company runs many accounts in AWS Organizations and uses Amazon GuardDuty, Amazon Inspector, and Amazon Macie. The security team needs one place to see the findings from all of these services across all accounts, together with automated checks against recognized security standards. Which solution meets these requirements?",
    "options": [
      "Create an Amazon CloudWatch dashboard in each account that displays the findings produced by each service.",
      "Configure an AWS Config aggregator in the security account that collects data from all member accounts.",
      "Deliver all findings to Amazon S3 through Amazon Data Firehose and query them with Amazon Athena.",
      "Enable AWS Security Hub for the organization with the security account as the delegated administrator, and turn on the security standards."
    ],
    "correct": 3,
    "explanation":
      "Security Hub ingests findings from GuardDuty, Inspector, Macie, and other integrated services in a common format, aggregates them from all member accounts into the delegated administrator account, and runs automated control checks against standards such as the CIS AWS Foundations Benchmark. CloudWatch dashboards visualize metrics rather than security findings. An AWS Config aggregator collects configuration and rule compliance data, not findings from the detection services. Exporting to Amazon S3 and querying with Athena builds a reporting pipeline the team would have to maintain and provides no standards checks."
  },
  {
    "id": 116,
    "domain": 1,
    "ts": "1.1",
    "q": "A company must give an external consulting firm read-only access to resources in its AWS account for the duration of an engagement. The company wants no long-term credentials to exist and must ensure that the consulting firm cannot be tricked into using its access on behalf of one of its other customers. Which solution meets these requirements?",
    "options": [
      "Create an IAM user for the consulting firm with the ReadOnlyAccess policy and rotate its access keys monthly.",
      "Create an IAM role with the ReadOnlyAccess policy whose trust policy allows the consulting firm account and requires a matching sts:ExternalId condition.",
      "Create an IAM role with the ReadOnlyAccess policy whose trust policy allows the consulting firm account, and attach a permissions boundary to the role.",
      "Invite the consulting firm account into the organization and attach a service control policy that allows only read actions."
    ],
    "correct": 1,
    "explanation":
      "A cross-account role removes the need for any stored credential, and the sts:ExternalId condition is the documented defense against the confused deputy problem: the consulting firm must present a value that only this company issued, so a request made on behalf of another customer cannot assume the role. A role without that condition still trusts the whole partner account and leaves the confused deputy risk open, and a permissions boundary only limits what the role can do. IAM user access keys are long-term credentials no matter how often they rotate. Bringing a third-party account into the organization gives the company far more control over that account than the engagement requires and still needs a role for the access itself."
  },
  {
    "id": 117,
    "domain": 1,
    "ts": "1.3",
    "q": "A company must guarantee that data exchanged between clients on the internet and its Application Load Balancer is encrypted in transit with a modern TLS version. Which solution meets these requirements?",
    "options": [
      "Enable access logging on the load balancer and deliver the logs to an Amazon S3 bucket that uses SSE-KMS.",
      "Attach a network ACL to the load balancer subnets that allows only inbound TCP traffic on port 443.",
      "Create an HTTPS listener on the load balancer with a certificate from AWS Certificate Manager and a security policy that requires TLS 1.2 or later.",
      "Set the target group protocol to HTTPS so that traffic between the load balancer and the targets is encrypted."
    ],
    "correct": 2,
    "explanation":
      "An HTTPS listener terminates TLS at the load balancer, and the listener security policy determines which TLS versions and ciphers are accepted, so selecting a policy that requires TLS 1.2 or later enforces the requirement. Access logging records request metadata and its encryption applies to the log objects at rest. A network ACL that permits only port 443 restricts which port clients may reach but does not itself establish or enforce TLS. An HTTPS target group protocol secures the second hop between the load balancer and the instances, not the client connection described in the requirement."
  },
  {
    "id": 118,
    "domain": 1,
    "ts": "1.2",
    "q": "A company must continuously identify known software vulnerabilities in its Amazon EC2 instances and in the container images stored in Amazon ECR, and must be told when an instance is unintentionally reachable from the internet. Which solution meets these requirements?",
    "options": [
      "Enable Amazon Inspector and turn on scanning for Amazon EC2 and Amazon ECR.",
      "Enable GuardDuty Malware Protection for Amazon EC2.",
      "Enable AWS Systems Manager Patch Manager and run a patch compliance scan on a schedule.",
      "Enable Amazon Macie and run discovery jobs against the container image repositories."
    ],
    "correct": 0,
    "explanation":
      "Amazon Inspector continuously scans EC2 instances and ECR images against vulnerability databases and also performs network reachability analysis, which reports paths that expose an instance to the internet. GuardDuty Malware Protection scans EBS volumes for malware after a finding, which is a different problem from a CVE inventory. Patch Manager reports whether approved patches are installed but does not enumerate vulnerabilities in container images or assess network exposure. Macie examines Amazon S3 objects for sensitive data."
  },
  {
    "id": 119,
    "domain": 1,
    "ts": "1.2",
    "q": "Instances in private subnets in two Availability Zones must download operating system updates from the internet. The instances must not be reachable from the internet, and outbound access must survive the loss of one Availability Zone. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Deploy one NAT gateway in a public subnet in one Availability Zone and route both private subnets to it.",
      "Attach an internet gateway to the VPC and assign an Elastic IP address to each instance.",
      "Deploy a NAT instance in a public subnet in each Availability Zone, disable the source/destination check, and route each private subnet to the instance in its own Availability Zone.",
      "Deploy a NAT gateway in a public subnet in each Availability Zone and route each private subnet to the NAT gateway in its own Availability Zone."
    ],
    "correct": 3,
    "explanation":
      "A NAT gateway is a zonal resource, so placing one in each Availability Zone and routing each private subnet to the gateway in its own zone keeps outbound access working when a zone fails, and AWS manages the scaling and patching of the gateways. A single NAT gateway leaves both subnets without outbound access when its Availability Zone is unavailable. Elastic IP addresses on the instances would make them directly reachable from the internet. NAT instances achieve the same topology but the company would have to size, patch, monitor, and fail over the instances itself."
  },
  {
    "id": 120,
    "domain": 1,
    "ts": "1.2",
    "q": "A SaaS provider must make its application available to customers who run their own VPCs. The traffic must not traverse the internet, and the provider does not want to manage overlapping CIDR ranges or expose its VPC address space to customers. Which solution meets these requirements?",
    "options": [
      "Create a VPC peering connection between the provider VPC and the VPC of each individual customer, accept each connection, reconcile the CIDR ranges, and update the route tables in both VPCs.",
      "Place a Network Load Balancer in front of the application, create a VPC endpoint service for it, and have each customer create an interface VPC endpoint in their own VPC.",
      "Create a transit gateway in the provider account, attach the provider VPC to it as well, and share that gateway with each of the customers through the AWS Resource Access Manager service.",
      "Publish the application through an internet-facing Application Load Balancer, and restrict access with security group rules that reference the public IP ranges of each customer network."
    ],
    "correct": 1,
    "explanation":
      "An AWS PrivateLink endpoint service exposes only the load balancer behind it: each customer creates an interface endpoint with an elastic network interface in their own VPC, so nothing is routed between the two VPCs, CIDR ranges never have to be reconciled, and the provider address space stays hidden. VPC peering joins the two address spaces, requires non-overlapping CIDR ranges, and does not scale to a mesh of customers. Sharing a transit gateway likewise connects networks and exposes routing. An internet-facing load balancer places the traffic on the internet, which the requirement excludes."
  },
  {
    "id": 121,
    "domain": 1,
    "ts": "1.3",
    "q": "A financial services company must store log files in Amazon S3 so that no user, including a user with administrator permissions or the account root user, can delete or overwrite them for seven years. Which solution meets these requirements?",
    "options": [
      "Enable S3 Versioning on the bucket and add a bucket policy that denies s3:DeleteObject.",
      "Enable S3 Object Lock in governance mode with a seven-year default retention period.",
      "Enable S3 Versioning and S3 Object Lock in compliance mode with a seven-year default retention period.",
      "Apply a lifecycle rule that transitions the objects to S3 Glacier Deep Archive and enable MFA delete on the bucket."
    ],
    "correct": 2,
    "explanation":
      "Object Lock requires versioning, and in compliance mode a protected object version cannot be overwritten or deleted by any user, including the root user, and the retention period cannot be shortened. Governance mode allows a principal that holds s3:BypassGovernanceRetention to remove the protection, so an administrator could still delete the object. A bucket policy that denies deletion can be edited by anyone who can change the policy. A lifecycle transition changes the storage class, and MFA delete adds a step to deletion rather than preventing it."
  },
  {
    "id": 122,
    "domain": 1,
    "ts": "1.1",
    "q": "A large company uses Okta as its corporate identity provider and must give employees single sign-on access to dozens of AWS accounts, with permissions assigned by directory group. The company does not want to create IAM users in each account. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Enable AWS IAM Identity Center, configure Okta as the external identity provider, and assign permission sets to the synchronized groups.",
      "Create an Amazon Cognito user pool federated with Okta and grant the pool users access to the accounts.",
      "Create a SAML identity provider and matching IAM roles in every member account, and configure Okta to post assertions to each account.",
      "Deploy AWS Directory Service Simple AD and establish a trust relationship with Okta."
    ],
    "correct": 0,
    "explanation":
      "IAM Identity Center connects once to Okta, synchronizes users and groups, and applies permission sets across the accounts in the organization, so adding an account or changing a group membership requires no per-account work. Amazon Cognito is designed for application end users rather than for workforce access to AWS accounts. Creating a SAML provider and roles in every account works but multiplies the configuration and maintenance by the number of accounts. Simple AD is a standalone managed directory and does not support a trust with an external SAML provider such as Okta."
  },
  {
    "id": 123,
    "domain": 1,
    "ts": "1.1",
    "q": "A company is hardening the root user of the management account of its organization and must apply the MOST important safeguard first. What should a solutions architect recommend?",
    "options": [
      "Create access keys for the root user and store them in AWS Secrets Manager so that automation can use them.",
      "Attach an IAM policy to the root user that grants only the permissions the account needs.",
      "Create a service control policy that denies all actions to the root user of the management account.",
      "Enable multi-factor authentication for the root user, delete any root access keys, and reserve the root user for tasks that require it."
    ],
    "correct": 3,
    "explanation":
      "Multi-factor authentication protects the one credential that cannot be constrained by IAM, and removing root access keys eliminates the possibility of programmatic use of that identity; reserving the root user for the small set of tasks that require it limits its exposure further. Creating root access keys is the opposite of that guidance regardless of where they are stored. Identity-based policies do not restrict the root user, and service control policies do not apply to the management account, so neither of those measures constrains it."
  },
  {
    "id": 124,
    "domain": 1,
    "ts": "1.3",
    "q": "A company stores objects in Amazon S3 and requires that each business unit supply its own encryption key for its objects. AWS must not retain the key, and the encryption must be performed on the server side. Which solution meets these requirements?",
    "options": [
      "Configure the bucket to use server-side encryption with Amazon S3 managed keys (SSE-S3) so that the objects of each business unit are encrypted as they are written.",
      "Have the application supply its own encryption key in every PUT and GET request by using server-side encryption with customer-provided keys (SSE-C).",
      "Create an AWS KMS key with imported key material, and configure the bucket to use SSE-KMS with that key, which AWS KMS stores and uses on the company's behalf.",
      "Have the application encrypt each object before it is uploaded using its own locally generated key, and store the resulting data keys in AWS Secrets Manager for later use."
    ],
    "correct": 1,
    "explanation":
      "With SSE-C the caller sends the encryption key with each request, Amazon S3 performs the encryption or decryption on the server side, and it discards the key immediately afterward, keeping only a salted HMAC to validate future requests. SSE-S3 uses keys that Amazon S3 owns. A KMS key with imported key material is still stored and used by AWS KMS on the customer’s behalf. Encrypting before upload is client-side encryption, which the requirement for server-side encryption excludes."
  },
  {
    "id": 125,
    "domain": 1,
    "ts": "1.2",
    "q": "After a network ACL was applied to a private subnet, instances in that subnet can no longer complete outbound HTTPS connections, although the security group on the instances allows the traffic. The network ACL currently allows outbound TCP port 443 and denies everything else inbound. Outbound HTTPS must work again while the network ACL stays in place. What should a solutions architect do to accomplish this?",
    "options": [
      "Add an inbound rule to the security group of the instances that allows the ephemeral port range 1024-65535 from 0.0.0.0/0 so that the responses are accepted.",
      "Change the network ACL to allow all inbound traffic from the VPC CIDR block that contains the subnet, in addition to the existing outbound port 443 rule.",
      "Add an inbound rule to the network ACL that allows TCP traffic on the ephemeral port range 1024-65535 from the destinations the instances contact.",
      "Remove the network ACL from the subnet entirely and rely on the security group alone, because a stateless network ACL cannot permit response traffic once a connection is open."
    ],
    "correct": 2,
    "explanation":
      "Network ACLs are stateless, so the response to an allowed outbound connection is evaluated against the inbound rules; the responses arrive on the ephemeral ports the client chose, which is why an inbound rule for the ephemeral port range is required. The security group is stateful and already permits the responses, so changing it has no effect. Allowing inbound traffic from the VPC CIDR block does not help because the responses come from addresses outside the VPC. Network ACLs can permit return traffic once the ephemeral range is allowed, so removing them is unnecessary."
  },
  {
    "id": 126,
    "domain": 1,
    "ts": "1.2",
    "q": "A company that serves applications through Amazon CloudFront, Application Load Balancers, and Amazon Route 53 is targeted by large and sophisticated DDoS attacks. The company requires 24/7 access to AWS DDoS experts during an event and wants to be reimbursed for the scaling charges that an attack causes. Which solution meets these requirements?",
    "options": [
      "Subscribe to AWS Shield Advanced, add the CloudFront distributions, load balancers, and hosted zones as protected resources, and enable automatic application layer DDoS mitigation.",
      "Rely on AWS Shield Standard, which is enabled automatically for all AWS customers and covers the protected resources at no extra charge against common network and transport layer floods.",
      "Create an AWS WAF web ACL with rate-based rules, and associate it with the CloudFront distributions and the load balancers.",
      "Enable Amazon GuardDuty, and create an Amazon EventBridge rule that updates an AWS WAF IP set whenever a finding is generated, so that the attacking addresses are blocked at the edge locations."
    ],
    "correct": 0,
    "explanation":
      "Shield Advanced is the tier that provides engagement with the AWS Shield Response Team during an attack and cost protection that credits the scaling charges a covered DDoS attack causes on protected resources. Shield Standard provides automatic protection against common network and transport layer attacks with neither of those benefits. Rate-based WAF rules help against request floods but come with no expert engagement or billing credits. GuardDuty produces findings and does not mitigate DDoS traffic."
  },
  {
    "id": 127,
    "domain": 1,
    "ts": "1.3",
    "q": "A company runs a three-tier application. The application exports reports to an Amazon S3 bucket and stores transactional data in an Amazon RDS DB instance. An auditor requires that the company data be encrypted AT REST in both locations. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Create an HTTPS listener on the Application Load Balancer with a certificate from AWS Certificate Manager.",
      "Enable default server-side encryption with AWS KMS keys (SSE-KMS) on the Amazon S3 bucket.",
      "Add a bucket policy that denies all Amazon S3 actions when the aws:SecureTransport condition key is false.",
      "Enable encryption on the Amazon RDS DB instance so that its storage, automated backups, and snapshots are encrypted.",
      "Establish an AWS Site-to-Site VPN connection between the corporate data center and the VPC."
    ],
    "correct": [1, 3],
    "explanation":
      "Default encryption with SSE-KMS causes Amazon S3 to encrypt every object it stores in the bucket, and enabling encryption on the DB instance encrypts its underlying storage along with its automated backups, read replicas, and snapshots; together they cover both places the data rests. An HTTPS listener, a policy that requires aws:SecureTransport, and a Site-to-Site VPN all protect data while it moves across a network and leave the stored copies unchanged."
  },
  {
    "id": 128,
    "domain": 1,
    "ts": "1.1",
    "q": "A batch application on Amazon EC2 instances reads from Amazon S3 and writes to Amazon DynamoDB. A review finds that the application authenticates with the access keys of an IAM user stored in a configuration file, and that the attached policy allows s3:* and dynamodb:* on all resources. The company must remove the long-term credentials and grant only the permissions the application needs. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Attach an IAM role to the instances through an instance profile, and delete the access keys from the configuration file and from IAM.",
      "Store the access keys in AWS Secrets Manager with a rotation schedule, and have the application retrieve them at startup instead of reading the configuration file.",
      "Replace the wildcard policy with a policy that allows only the required actions on the specific bucket and table ARNs.",
      "Attach a service control policy to the account that denies s3:DeleteBucket and dynamodb:DeleteTable.",
      "Create an AWS Config rule that reports IAM users whose access keys are older than 90 days."
    ],
    "correct": [0, 2],
    "explanation":
      "An instance profile supplies temporary credentials that AWS rotates, so deleting the access keys removes the long-term credential entirely, and scoping the policy to the specific actions and resource ARNs implements least privilege. Moving the keys into Secrets Manager changes where the long-term credential is stored but not the fact that one exists. A service control policy that blocks two destructive actions leaves the rest of the wildcard permissions in place. An AWS Config rule reports aging keys without removing them or narrowing any permission."
  },
  {
    "id": 129,
    "domain": 1,
    "ts": "1.2",
    "q": "A company must inspect and filter traffic that leaves several VPCs, using stateful rules that can block traffic to disallowed domain names and detect intrusion attempts. The company wants a managed service and a central point of enforcement. Which solution meets these requirements?",
    "options": [
      "Configure security group rules on the instances that allow only the approved destination ports and addresses for the outbound traffic of each VPC.",
      "Create an AWS WAF web ACL with a rule group that blocks any request to the disallowed domain names, and associate the web ACL with each application load balancer.",
      "Enable Amazon GuardDuty, and act on the DNS-based findings that it produces for each of the VPCs by reviewing them in the GuardDuty console every morning.",
      "Deploy AWS Network Firewall in a centralized inspection VPC and route the VPC traffic through its firewall endpoints with stateful rule groups."
    ],
    "correct": 3,
    "explanation":
      "AWS Network Firewall is a managed stateful firewall whose rule groups support domain list filtering and Suricata-compatible intrusion prevention rules, and deploying it in an inspection VPC gives one enforcement point for traffic from several VPCs. Security groups match on protocol, port, and address and cannot filter by domain name or inspect a session. AWS WAF inspects HTTP requests that arrive at CloudFront, an Application Load Balancer, or API Gateway rather than traffic leaving a VPC. GuardDuty reports suspicious DNS activity but takes no action to block it."
  },
  {
    "id": 130,
    "domain": 1,
    "ts": "1.3",
    "q": "A company must store database credentials that are rotated on a schedule without any custom rotation code, along with several hundred non-sensitive configuration values for which it wants to avoid per-parameter charges. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Store the database credentials in AWS Secrets Manager and turn on managed rotation for the DB instance.",
      "Store the database credentials as a SecureString parameter in AWS Systems Manager Parameter Store and rotate them with a Lambda function that the company writes.",
      "Store the configuration values as standard-tier parameters in AWS Systems Manager Parameter Store.",
      "Store the configuration values as advanced-tier parameters in AWS Systems Manager Parameter Store.",
      "Store the configuration values in AWS Secrets Manager alongside the database credentials."
    ],
    "correct": [0, 2],
    "explanation":
      "Secrets Manager provides managed rotation for supported database engines, so the credentials are changed on schedule without the company writing rotation code. Standard-tier parameters in Parameter Store carry no additional charge, which suits a large number of non-sensitive configuration values. Rotating a Parameter Store value requires the company to build and operate the rotation function itself. Advanced-tier parameters raise the limits but do incur charges, and every secret stored in Secrets Manager is billed per secret, so both alternatives add cost for data that does not need them."
  },
  {
    "id": 131,
    "domain": 1,
    "ts": "1.2",
    "q": "A security investigation shows that an application on Amazon EC2 was exploited through a server-side request forgery flaw: the attacker made the application issue a request to the instance metadata service and retrieved the credentials of the attached IAM role. The company needs the change that BEST mitigates this class of attack while the instances keep using their IAM role. Which approach will meet these requirements?",
    "options": [
      "Remove the instance profile from the instances and store credentials in AWS Secrets Manager instead.",
      "Configure the instance metadata options to require IMDSv2 by setting HttpTokens to required.",
      "Add an outbound security group rule that denies traffic to 169.254.169.254.",
      "Attach a permissions boundary to the instance role that denies sts:AssumeRole."
    ],
    "correct": 1,
    "explanation":
      "With HttpTokens set to required, metadata can only be read by first issuing a PUT request that carries the token TTL header to obtain a session token, and the metadata service rejects token requests that include an X-Forwarded-For header; server-side request forgery flaws that can only make the application issue a plain GET to a supplied URL therefore fail. Removing the instance profile forces the application back to a long-term credential, which is a worse outcome. Security groups can only allow traffic, so a deny rule cannot be written. A permissions boundary limits what the stolen credentials can do but does not stop them from being read."
  },
  {
    "id": 132,
    "domain": 1,
    "ts": "1.3",
    "q": "After a customer completes a purchase, a web application must let that customer download one private object from an Amazon S3 bucket for 15 minutes. The bucket must not be public and the company will not create IAM users for customers. Which solution meets these requirements?",
    "options": [
      "Make the objects publicly readable and rely on object keys that cannot be guessed.",
      "Create an IAM role for each customer and hand out temporary credentials through sts:AssumeRole.",
      "Have the application generate an Amazon S3 presigned URL for the object with an expiration of 15 minutes.",
      "Serve the objects through an Amazon CloudFront distribution that uses an origin access control."
    ],
    "correct": 2,
    "explanation":
      "A presigned URL is signed with the credentials of the application and grants access to one specific object until the expiration time passes, which matches the requirement exactly and leaves the bucket private. Public objects with unguessable keys stay readable to anyone who obtains a link, with no expiry. Creating a role per customer does not scale and puts customer identities into IAM. An origin access control lets CloudFront read from a private bucket, but on its own the distribution serves the object to anyone who requests it; time-limited access would require CloudFront signed URLs or signed cookies."
  },
  {
    "id": 133,
    "domain": 1,
    "ts": "1.3",
    "q": "A compliance team requires that Amazon S3 reject any request to a sensitive bucket that is not sent over TLS. Which solution meets these requirements?",
    "options": [
      "Enable default server-side encryption with SSE-KMS on the bucket for every new object, using a customer managed KMS key created for this bucket.",
      "Create a VPC endpoint policy for the Amazon S3 gateway endpoint that allows only the requests that are sent to the bucket over HTTPS.",
      "Enable S3 Block Public Access on the bucket so that anonymous requests are rejected, blocking public access at both the bucket and the account level.",
      "Add a bucket policy statement that denies s3:* for all principals when the aws:SecureTransport condition key is false."
    ],
    "correct": 3,
    "explanation":
      "A bucket policy is evaluated for every request to the bucket regardless of its origin, so an explicit Deny conditioned on aws:SecureTransport being false rejects any plaintext HTTP request. Default encryption protects the stored objects and says nothing about the transport. A VPC endpoint policy only applies to requests that arrive through that endpoint, leaving requests from the internet or from other networks unaffected. Block Public Access governs who may access the bucket, not how the request is transported."
  },
  {
    "id": 134,
    "domain": 1,
    "ts": "1.2",
    "q": "An operations team needs interactive shell access to Amazon EC2 instances in private subnets. The security team prohibits bastion hosts and SSH key distribution, forbids any inbound rule on port 22, and requires that every session be recorded. Which solution meets these requirements?",
    "options": [
      "Use AWS Systems Manager Session Manager, control who may start sessions with IAM policies, and enable session logging to Amazon S3 and Amazon CloudWatch Logs.",
      "Deploy a bastion host in a public subnet, allow SSH to it from the corporate CIDR block only, and record every session that passes through the bastion host so that it can be reviewed afterwards.",
      "Create an EC2 Instance Connect Endpoint in the VPC, and allow inbound port 22 from the security group of that endpoint only, on every instance in the private subnets.",
      "Establish an AWS Site-to-Site VPN connection to the VPC, and open SSH to the instances from the corporate network only, through a security group rule scoped to that network's CIDR range."
    ],
    "correct": 0,
    "explanation":
      "Session Manager connects through the SSM agent making an outbound connection to the Systems Manager service, so no inbound rule and no SSH key are needed; access is authorized by IAM policy and the session output can be streamed to Amazon S3 and CloudWatch Logs. A bastion host is explicitly excluded and still requires port 22 and keys. EC2 Instance Connect Endpoint removes the public path but still requires an inbound rule on port 22 and provides no session recording. A VPN changes where the SSH session originates and leaves both the port 22 rule and the key management in place."
  },
  {
    "id": 135,
    "domain": 1,
    "ts": "1.1",
    "q": "A security team must continuously identify Amazon S3 buckets, IAM roles, AWS KMS keys, and similar resources whose policies grant access to principals outside the organization. Which solution meets these requirements?",
    "options": [
      "Enable AWS Config with the managed rules for publicly accessible S3 buckets and unrestricted security groups.",
      "Enable IAM Access Analyzer with the organization as the zone of trust and review the external access findings.",
      "Enable Amazon Macie and run sensitive data discovery jobs against the buckets.",
      "Query AWS CloudTrail logs with Amazon Athena to find API calls that originate from external accounts."
    ],
    "correct": 1,
    "explanation":
      "IAM Access Analyzer applies automated reasoning to resource policies and generates a finding whenever a policy allows access from outside the zone of trust, covering the resource types in the requirement. AWS Config managed rules examine a fixed set of configuration properties and do not evaluate the effect of an arbitrary policy across all these resource types. Macie classifies the contents of Amazon S3 objects. CloudTrail analysis reveals access that already happened rather than the policies that permit it."
  },
  {
    "id": 136,
    "domain": 1,
    "ts": "1.1",
    "q": "A platform team lets developers create IAM roles for their own applications in a shared account. Those developer-created roles must never be able to exceed a defined set of maximum permissions, while the existing operations roles in the same account must keep their current permissions. Which solution meets these requirements?",
    "options": [
      "Attach a service control policy through AWS Organizations to the account that denies every action the developer-created roles must not be able to perform, ever.",
      "Attach an IAM identity-based policy that lists the full set of maximum permissions directly to each of the developer users instead of to the roles they create.",
      "Create a permissions boundary policy, and grant developers iam:CreateRole only on the condition that the new role has that permissions boundary attached.",
      "Create an AWS Config rule that detects any role whose policies exceed the approved set of actions, and that notifies the platform team so the role can be corrected."
    ],
    "correct": 2,
    "explanation":
      "A permissions boundary caps what an identity-based policy can grant to the role it is attached to; making iam:CreateRole conditional on the boundary being present guarantees that every role a developer creates carries the cap, while roles created earlier are untouched. A service control policy applies to every principal in the account, so it would also restrict the operations roles. A policy attached to the developer users limits what the developers themselves may do, not what the roles they create may do. An AWS Config rule detects the problem after the role exists."
  },
  {
    "id": 137,
    "domain": 1,
    "ts": "1.2",
    "q": "A company must detect security groups that allow inbound SSH traffic from 0.0.0.0/0 and remove the offending rule automatically, without a person intervening. Which solution meets these requirements?",
    "options": [
      "Enable Amazon GuardDuty, and send its findings to an Amazon SNS topic that notifies the security team as soon as an offending security group rule appears anywhere in the account.",
      "Review the AWS Trusted Advisor security checks every week, and manually correct any of the findings that it reports about the security group configuration.",
      "Create an Amazon EventBridge rule on VPC Flow Logs that invokes an AWS Lambda function to revoke the rule, using the flow log records delivered to CloudWatch Logs.",
      "Enable the AWS Config managed rule restricted-ssh and attach an AWS Systems Manager Automation remediation action that removes the noncompliant rule."
    ],
    "correct": 3,
    "explanation":
      "AWS Config evaluates each security group change against the restricted-ssh managed rule, and an attached Automation remediation action runs a Systems Manager document that revokes the rule as soon as the resource is marked noncompliant, so the correction needs no operator. GuardDuty reports threats rather than configuration drift, and an SNS notification still requires someone to act. Weekly Trusted Advisor reviews are manual and slow. VPC Flow Logs record traffic that has already been allowed and do not describe the security group configuration."
  },
  {
    "id": 138,
    "domain": 1,
    "ts": "1.2",
    "q": "After a suspected intrusion, a security team must determine which IP addresses communicated with specific Amazon EC2 instances, on which ports, and whether the traffic was accepted or rejected. Which solution meets these requirements?",
    "options": [
      "Enable VPC Flow Logs on the network interfaces of the instances and query the records with Amazon CloudWatch Logs Insights.",
      "Create an AWS CloudTrail trail with data events enabled for the instances under investigation, and deliver the resulting log files to an Amazon S3 bucket.",
      "Enable AWS Config recording for the Amazon EC2 and Amazon VPC resource types in the account, and review the configuration timeline of each instance.",
      "Enable Route 53 Resolver query logging for the VPC that contains the instances, and send the query logs to a CloudWatch Logs log group for review."
    ],
    "correct": 0,
    "explanation":
      "VPC Flow Logs capture the source and destination address, the ports, the protocol, and the ACCEPT or REJECT action for traffic on an elastic network interface, which is precisely the record the investigation needs. CloudTrail records API calls to AWS services, not packet flows between hosts. AWS Config tracks configuration changes to resources. Resolver query logging shows which domain names were resolved but not the addresses, ports, or outcome of the connections."
  },
  {
    "id": 139,
    "domain": 1,
    "ts": "1.3",
    "q": "A company encrypts Amazon S3 objects with an AWS KMS key in us-east-1 and replicates them to eu-west-1 for disaster recovery. The company must be able to decrypt the replicated objects in eu-west-1 without re-encrypting the data and without calling KMS in us-east-1. Which solution meets these requirements?",
    "options": [
      "Create a separate AWS KMS key in eu-west-1, and re-encrypt each object with that key after it has been replicated, using an S3 Batch Operations job.",
      "Create a multi-Region primary KMS key in us-east-1, replicate it to eu-west-1, and configure the replicated objects to use the replica key.",
      "Grant the principals in eu-west-1 access to the us-east-1 key through the key policy of that key, so that they can decrypt the replicated objects.",
      "Create an AWS KMS key with imported key material in each Region, and import the same key material into both of them, tracking its expiration date."
    ],
    "correct": 1,
    "explanation":
      "Multi-Region keys are related KMS keys in different Regions that share key material and key ID, so ciphertext produced by the primary key can be decrypted by the replica key locally, with no cross-Region call and no re-encryption. Re-encrypting every replicated object adds cost and latency for the same result. A key policy can grant access to principals anywhere, but the API call still has to reach the KMS endpoint in us-east-1, which the requirement excludes. Importing the same material into two ordinary keys does not help, because those keys have different key IDs and a ciphertext is bound to the key that produced it."
  },
  {
    "id": 140,
    "domain": 1,
    "ts": "1.2",
    "q": "A company with dozens of accounts in AWS Organizations must apply the same AWS WAF rules and security group baseline in every account, including accounts added later, and must have violations corrected automatically. Which solution meets these requirements?",
    "options": [
      "Deploy the AWS WAF web ACLs and the security group rules to every account with AWS CloudFormation StackSets.",
      "Enable AWS Security Hub with a delegated administrator account and turn on the security standards.",
      "Enable AWS Firewall Manager with a delegated administrator account and create AWS WAF and security group policies scoped to the organization.",
      "Attach a service control policy that denies the creation of security groups that do not match the baseline."
    ],
    "correct": 2,
    "explanation":
      "Firewall Manager applies WAF and security group policies across the accounts of an organization, automatically covers accounts and resources that appear later, and can be configured to remediate resources that fall out of compliance. StackSets can deploy the resources but do not detect or correct a change made afterwards in a member account. Security Hub reports on compliance without enforcing the rules. A service control policy can only deny API calls wholesale and cannot express a security group baseline or repair an existing group."
  },
  {
    "id": 141,
    "domain": 1,
    "ts": "1.1",
    "q": "A network team maintains VPCs centrally and wants several accounts in the same organization to launch resources into subnets that the network account owns, without duplicating VPCs in each account and without peering. Which solution meets these requirements?",
    "options": [
      "Create a VPC peering connection between the central VPC and a VPC in each account.",
      "Create a transit gateway in the network account and attach a VPC from each account to it.",
      "Deploy the same VPC and subnet design in each account with AWS CloudFormation StackSets.",
      "Use AWS Resource Access Manager to share the subnets of the central VPC with the other accounts in the organization."
    ],
    "correct": 3,
    "explanation":
      "AWS RAM supports sharing VPC subnets with other accounts in the same organization: the owner account keeps control of the VPC, routing, and network ACLs, and participant accounts launch their own resources directly into the shared subnets. Peering and transit gateway both connect separate VPCs and therefore require each account to keep its own VPC. StackSets would create a duplicate VPC in every account, which is exactly what the team wants to avoid."
  },
  {
    "id": 142,
    "domain": 1,
    "ts": "1.2",
    "q": "A team is building a consumer web application that needs user sign-up, sign-in, password reset, multi-factor authentication, and JSON Web Tokens that an Amazon API Gateway REST API can validate. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Create an Amazon Cognito user pool and configure it as a JWT authorizer for the API Gateway API.",
      "Configure AWS IAM Identity Center as the identity source for the application users.",
      "Have a custom login page validate passwords and then call AWS STS to issue temporary credentials to each user.",
      "Deploy an open source identity provider on Amazon EC2 instances behind an Application Load Balancer."
    ],
    "correct": 0,
    "explanation":
      "A Cognito user pool is a managed user directory that already implements sign-up, sign-in, password recovery, and multi-factor authentication, and it issues OpenID Connect tokens that API Gateway can validate with a built-in JWT authorizer, so no authentication code has to be written or operated. IAM Identity Center manages workforce access to AWS accounts and applications, not consumer sign-up. AWS STS issues AWS credentials and provides no user directory, sign-up flow, or MFA. Running an identity provider on EC2 leaves the team responsible for its availability, patching, and security."
  },
  {
    "id": 143,
    "domain": 1,
    "ts": "1.2",
    "q": "A public API behind Amazon CloudFront and an Application Load Balancer is under an HTTP flood in which individual source IP addresses send thousands of requests per minute, while legitimate clients send far fewer. Which solution meets these requirements?",
    "options": [
      "Create an AWS WAF IP set that contains the source addresses of all the known legitimate clients, and block every other address at the web ACL of the CloudFront distribution.",
      "Add a rate-based rule to the AWS WAF web ACL that blocks source IP addresses whose request count exceeds a configured limit within the evaluation window.",
      "Rely on AWS Shield Standard, which is enabled automatically at no additional charge for every CloudFront distribution and Application Load Balancer in the account.",
      "Add a geographic match rule to the AWS WAF web ACL that blocks any request from a country outside the company market, based on the source IP address of each request."
    ],
    "correct": 1,
    "explanation":
      "A rate-based rule counts requests per source IP address over its evaluation window and blocks the addresses that exceed the limit until their rate drops, which separates the flooding addresses from ordinary clients without an operator listing them. An allow list of known clients is impossible to maintain for a public API. Shield Standard mitigates network and transport layer attacks and does not count application requests per address. Geographic blocking penalizes legitimate users in the blocked countries and does nothing about flooding sources inside the permitted ones."
  },
  {
    "id": 144,
    "domain": 1,
    "ts": "1.1",
    "q": "A company uses AWS Organizations and must guarantee that API activity is logged in every current and future member account and delivered to one access-controlled Amazon S3 bucket in a security account. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Create a trail in each member account and configure each trail to deliver its log files to the central bucket.",
      "Enable AWS Config in every account and aggregate the results in the security account.",
      "Create an organization trail in the management account and deliver the log files to the central bucket in the security account.",
      "Create an Amazon EventBridge rule in each account that forwards CloudTrail events to an event bus in the security account."
    ],
    "correct": 2,
    "explanation":
      "An organization trail is created once and logs events for every account in the organization, including accounts that join later, and member accounts cannot modify or delete it, so it needs no per-account work. Creating a trail in each account means repeating the work for every new account and leaves the trail under the control of that account. AWS Config records configuration state rather than API activity. EventBridge rules would have to be created and maintained per account and forward events rather than produce the durable, integrity-validated log files that CloudTrail delivers."
  },
  {
    "id": 145,
    "domain": 1,
    "ts": "1.3",
    "q": "An application on Amazon EC2 connects to an Amazon RDS for PostgreSQL DB instance. The security team must eliminate the static database password that is currently held in a configuration file on the instance. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Store the password in an environment variable on the instance and restrict who can read the process environment.",
      "Enable IAM database authentication on the DB instance and have the application generate a short-lived authentication token for each connection.",
      "Store the password in a file on an Amazon EBS volume that is encrypted with a customer managed AWS KMS key, with the file permissions restricted to the application user.",
      "Store the credentials in AWS Secrets Manager, enable a rotation schedule for them, and have the application retrieve them at runtime.",
      "Store the password as a standard String parameter in AWS Systems Manager Parameter Store and read it at startup."
    ],
    "correct": [1, 3],
    "explanation":
      "IAM database authentication removes the password entirely: the application signs a request with its IAM credentials to obtain an authentication token that is valid for 15 minutes and uses that token to connect. Secrets Manager keeps the credential out of the instance and rotates it on a schedule, so no static value has to be deployed. An environment variable, a file on an encrypted volume, and a plaintext String parameter all keep the same static password in place; encrypting the volume protects the disk, not the credential inside a running system."
  },
  {
    "id": 146,
    "domain": 1,
    "ts": "1.1",
    "q": "A company that operates from a single AWS account plans to expand to dozens of accounts, one per business unit. The company wants an automated way to build a multi-account environment that includes a standard account structure, centralized log archiving, federated sign-in, and preventive and detective rules that apply automatically to every account placed in an organizational unit. The company has a small platform team. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Use AWS Control Tower to set up a landing zone with organizational units, and enable the required preventive and detective controls on those organizational units.",
      "Create each account manually in AWS Organizations and attach a separate service control policy to every individual account.",
      "Use AWS CloudFormation StackSets to deploy a standard set of logging and IAM resources into each account after an administrator creates it.",
      "Configure an AWS Config aggregator in a central account and write custom AWS Config rules that report on the configuration of each new account."
    ],
    "correct": 0,
    "explanation":
      "AWS Control Tower sets up a landing zone: it creates the organization structure, a log archive and audit account, identity federation through IAM Identity Center, and applies preventive, detective, and proactive controls at the organizational unit level, so every account enrolled in an OU inherits them. Attaching an SCP per account is manual and does not deliver logging or federation. StackSets deploys resources but provides no account factory, no OU-level governance model, and no built-in control library. AWS Config aggregation only reports on configuration after the fact and does not build the environment or prevent anything."
  },
  {
    "id": 147,
    "domain": 1,
    "ts": "1.1",
    "q": "A security team deploys an incident response IAM role into every member account of an AWS Organizations organization. Application teams hold administrator permissions in their own accounts. The security team must guarantee that no principal in a member account can delete or modify the incident response role or its attached policies, while the security team itself retains the ability to update the role. Which solution meets these requirements?",
    "options": [
      "Attach an IAM permissions boundary to the incident response role that denies the iam:DeleteRole and iam:DetachRolePolicy actions.",
      "Add a resource-based policy to the incident response role that denies all IAM actions from principals in the member account.",
      "Create an AWS Config rule that detects changes to the incident response role and triggers an automatic remediation that recreates it.",
      "Attach a service control policy to the organizational units that denies IAM write actions on the incident response role ARN, with a condition that excludes the security team's role."
    ],
    "correct": 3,
    "explanation":
      "A service control policy sets the maximum available permissions for member accounts, so a Deny on IAM write actions targeting that role ARN overrides any account administrator's IAM policy; an aws:PrincipalArn condition that excludes the security team's role keeps the security team able to manage it. A permissions boundary limits what the incident response role itself can do; it does not stop other principals from deleting it. IAM roles support a trust policy, which controls who can assume the role, not who can delete it. An AWS Config rule is detective and recreates the role only after the damage is done."
  },
  {
    "id": 148,
    "domain": 1,
    "ts": "1.1",
    "q": "A network team runs a transit gateway in a central networking account. Application teams work in separate accounts of the same AWS Organizations organization and must attach their own VPCs to that transit gateway. The networking team must keep ownership of the transit gateway and its route tables, and it does not want to recreate a gateway in each account. Which solution meets these requirements?",
    "options": [
      "Create a VPC peering connection between the networking VPC and every application VPC, and accept each request from the application accounts.",
      "Use AWS Resource Access Manager to share the transit gateway with the organization, then have each application account create an attachment from its own VPC.",
      "Create an AWS PrivateLink endpoint service in the networking account and an interface endpoint in each application VPC.",
      "Deploy the transit gateway configuration into every application account with AWS CloudFormation StackSets."
    ],
    "correct": 1,
    "explanation":
      "AWS Resource Access Manager shares supported resources such as transit gateways, subnets, and Route 53 Resolver rules with other accounts or an entire organization. The owner keeps control of the resource and its route tables while consumers create attachments from their own VPCs. VPC peering creates a mesh of point-to-point connections and is not transitive. PrivateLink exposes a single service endpoint, not general routing between VPCs. StackSets would create a separate transit gateway in each account, which defeats centralization and multiplies cost."
  },
  {
    "id": 149,
    "domain": 1,
    "ts": "1.1",
    "q": "A company manages user identities in an AWS Managed Microsoft AD directory that it runs in AWS. Employees must sign in to multiple AWS accounts in the organization with their existing directory credentials, and access must be granted by directory group so that adding a user to a group grants that user a defined set of permissions in the assigned accounts. Which solution meets these requirements?",
    "options": [
      "Create an IAM user in each account for every employee and add the users to IAM groups that mirror the directory groups.",
      "Configure an IAM SAML identity provider in every account and write a separate trust policy for each role in each account.",
      "Connect IAM Identity Center to the AWS Managed Microsoft AD directory as its identity source and assign permission sets to directory groups for the target accounts.",
      "Create an Amazon Cognito user pool, federate it with the directory, and use identity pool roles to grant access to each account."
    ],
    "correct": 2,
    "explanation":
      "IAM Identity Center supports AWS Managed Microsoft AD as an identity source. Permission sets are defined once and assigned to directory groups for chosen accounts, and Identity Center provisions the corresponding roles in each account automatically. Creating IAM users per account duplicates identity management and breaks the single-credential requirement. Configuring a SAML provider and roles account by account works technically but requires managing trust policies everywhere, which is exactly what Identity Center removes. Amazon Cognito is built for application end users, not for workforce access to AWS accounts."
  },
  {
    "id": 150,
    "domain": 1,
    "ts": "1.1",
    "q": "A company keeps all of its engineers' identities in one AWS account and runs its workloads in separate development and production accounts. Engineers must be able to work in the workload accounts from the AWS Management Console without a second set of credentials, and permissions must differ between development and production. The company wants no long-term access keys in the workload accounts. Which approach will meet these requirements?",
    "options": [
      "Create an IAM role in each workload account with a trust policy that allows the identity account, grant the engineers permission to call sts:AssumeRole, and have them switch roles in the console.",
      "Create IAM users in each workload account, and distribute their access keys to the engineers through an encrypted channel so that no key is ever sent in plaintext and each engineer keeps only their own credentials.",
      "Create an IAM group in the identity account, add every engineer as a member, and attach customer managed policies to it that reference the Amazon Resource Names of the resources located in each of the workload accounts.",
      "Enable AWS Organizations consolidated billing so that the IAM policies of the identity account apply to the workload accounts as well."
    ],
    "correct": 0,
    "explanation":
      "Cross-account access is granted with a role in the target account whose trust policy names the identity account, plus an identity policy in the identity account allowing sts:AssumeRole on that role. AWS STS issues temporary credentials, and the console offers role switching, so no keys are stored in the workload accounts. Distributing access keys creates long-term credentials in every account. An IAM policy in one account cannot grant access to resources in another account without the target account also allowing it. Consolidated billing aggregates charges and does not share permissions between accounts."
  },
  {
    "id": 151,
    "domain": 1,
    "ts": "1.1",
    "q": "A company runs an on-premises Microsoft Active Directory forest that holds all employee accounts, and its security policy forbids storing or replicating any directory data in the AWS Cloud. Employees must be able to sign in to the AWS Management Console with their existing corporate credentials, and every authentication request must be evaluated by the on-premises domain controllers. An AWS Direct Connect link between the data center and the VPC is already in place. Which solution meets these requirements?",
    "options": [
      "Deploy AWS Managed Microsoft AD in the VPC and synchronize the user accounts from the on-premises directory with a scheduled job.",
      "Deploy AWS Directory Service AD Connector and use it to redirect authentication requests to the on-premises Active Directory.",
      "Deploy Simple AD in the VPC and recreate the corporate user accounts in it.",
      "Create an Amazon Cognito user pool and configure the on-premises Active Directory as an external identity provider."
    ],
    "correct": 1,
    "explanation":
      "AD Connector is a directory gateway that proxies authentication requests to on-premises Active Directory without caching any directory information in the cloud, and it enables console sign-in with existing corporate credentials. AWS Managed Microsoft AD is a directory running in AWS, so a synchronization job would copy user data into the cloud, which the company forbids. Simple AD is a standalone Samba-based directory that would duplicate the accounts and does not use the corporate domain controllers. Amazon Cognito targets application users rather than workforce console access."
  },
  {
    "id": 152,
    "domain": 1,
    "ts": "1.1",
    "q": "A company has a remote workforce that needs access to internal applications hosted on Amazon EC2 instances in private subnets. Users must authenticate with their Active Directory credentials, and different Active Directory groups must be allowed to reach different subnet ranges. The company wants a managed remote access service and does not want to run VPN appliances on EC2 instances. Which solution meets these requirements?",
    "options": [
      "Configure an AWS Site-to-Site VPN between the corporate data center and the VPC, and require employees to connect to the office network first.",
      "Deploy a bastion host in a public subnet and open inbound RDP and SSH from the users' home IP addresses.",
      "Create an AWS Client VPN endpoint that uses Active Directory authentication, and define authorization rules that grant each directory group access to specific network ranges.",
      "Publish the applications through an internet-facing Application Load Balancer and restrict access with security group rules."
    ],
    "correct": 2,
    "explanation":
      "AWS Client VPN is a managed client-based VPN service. It supports Active Directory authentication and authorization rules that map directory groups to the network ranges they are allowed to reach, which is exactly the per-group segmentation required. Site-to-Site VPN connects networks, not individual remote clients, and forcing users through the office adds a dependency the company does not want. A bastion host exposes ports to the internet, requires per-user IP management, and does not perform directory-based authorization. An internet-facing load balancer publishes the applications rather than providing private network access."
  },
  {
    "id": 153,
    "domain": 1,
    "ts": "1.1",
    "q": "A company stores a large shared dataset in one Amazon S3 bucket that several internal teams use through different applications. The bucket policy has grown long and difficult to review. The company wants each application to reach the data through its own named entry point with its own permissions, and it wants one of those entry points to accept requests only from a specific VPC. Which solution meets these requirements?",
    "options": [
      "Create one IAM role per application, and attach an inline policy that limits each of those roles to a different key prefix inside the shared bucket, reviewed by the platform team.",
      "Split the dataset into one bucket per application, and replicate the objects between those buckets so that every team sees the whole dataset, using S3 Replication rules configured on each bucket.",
      "Enable S3 Block Public Access on the shared bucket, and add a bucket policy condition on the aws:SourceIp of each application, listing the outbound IP ranges that application uses to reach the bucket.",
      "Create an S3 access point for each application, attach an access point policy to each one, and configure the VPC-restricted application's access point with a VPC network origin."
    ],
    "correct": 3,
    "explanation":
      "S3 access points give a shared bucket multiple named network endpoints, each with its own access point policy, which replaces a single oversized bucket policy. An access point created with a VPC network origin only accepts requests from that VPC, and Amazon S3 always treats such an access point as non-public. Per-role inline policies still leave every application pointed at the same endpoint and do not enforce a VPC origin. Splitting and replicating the data duplicates storage and creates consistency problems. Block Public Access and source IP conditions do not restrict traffic to a VPC."
  },
  {
    "id": 154,
    "domain": 1,
    "ts": "1.1",
    "q": "A company stores build artifacts in an Amazon S3 bucket in a shared services account. Every account in the company's AWS Organizations organization must be able to read the artifacts, and accounts are created and closed frequently. The security team requires that accounts outside the organization never gain access, and it does not want to edit the bucket policy each time the account list changes. Which solution meets these requirements?",
    "options": [
      "Add a bucket policy statement that allows s3:GetObject and includes a condition on aws:PrincipalOrgID matching the organization ID.",
      "List each member account ID as a principal in the bucket policy and update the list whenever an account is added or removed.",
      "Attach a service control policy to the organization root that allows s3:GetObject on the artifacts bucket.",
      "Enable S3 Cross-Region Replication to copy the artifacts into a bucket in each member account."
    ],
    "correct": 0,
    "explanation":
      "The aws:PrincipalOrgID condition key matches any principal that belongs to the specified organization, so the bucket policy stays valid as accounts join and leave and no account outside the organization qualifies. Enumerating account IDs is the manual maintenance the company wants to avoid. A service control policy can only restrict permissions granted elsewhere; it never grants access, and it does not apply to a resource policy in another account. Replication copies data into every account, multiplying storage cost and losing the single source of truth."
  },
  {
    "id": 155,
    "domain": 1,
    "ts": "1.1",
    "q": "A company runs an application on Amazon EC2 instances in private subnets. The instances read and write objects in an Amazon S3 bucket. The security team requires that the traffic to Amazon S3 stay on the AWS network instead of traversing the NAT gateway, and that the bucket reject any request that does not originate from the application's VPC, including requests made with valid credentials from elsewhere. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Create a gateway VPC endpoint for Amazon S3 and add the endpoint to the route tables of the private subnets.",
      "Create an interface VPC endpoint for Amazon EC2 in the private subnets and associate it with the instances' security group.",
      "Add a bucket policy statement that denies all S3 actions when aws:SourceVpce does not match the endpoint ID.",
      "Add a bucket policy statement that denies all S3 actions when aws:SecureTransport is false.",
      "Attach an IAM policy to the instance role that allows s3:GetObject and s3:PutObject only on the bucket."
    ],
    "correct": [0, 2],
    "explanation":
      "A gateway VPC endpoint for Amazon S3 adds a route in the private subnets so that S3 traffic leaves through the AWS network instead of the NAT gateway, and it costs nothing. A bucket policy that denies requests whose aws:SourceVpce does not match that endpoint enforces the network restriction on the bucket itself, so credentials used from anywhere else are rejected. An interface endpoint for Amazon EC2 concerns the EC2 API, not S3 data access. The aws:SecureTransport condition enforces TLS, which is a different requirement. An identity policy on the instance role grants the application its permissions but does nothing about requests coming from other locations."
  },
  {
    "id": 156,
    "domain": 1,
    "ts": "1.1",
    "q": "An application has run for a year with an IAM role that grants broad permissions on several AWS services. A solutions architect must replace that role's policy with a least privilege policy based on the actions the application actually called. The team does not know the full list of API calls and wants to avoid breaking the application through guesswork. AWS CloudTrail is enabled and delivers logs to an Amazon S3 bucket. Which approach will meet these requirements?",
    "options": [
      "Enable AWS Config and use the configuration history of the role to determine which permissions to keep.",
      "Attach a permissions boundary to the role that allows only the services listed in the current policy.",
      "Use IAM Access Analyzer policy generation to build a policy from the role's activity recorded in AWS CloudTrail, then review and attach it.",
      "Use IAM Access Analyzer external access findings to list the permissions the role no longer needs."
    ],
    "correct": 2,
    "explanation":
      "IAM Access Analyzer policy generation reads AWS CloudTrail events for a chosen role over a selected time range and produces a policy containing the actions that were actually used, which the team then reviews before attaching. AWS Config records configuration changes to the role, not the API calls the role made. A permissions boundary caps permissions but does not identify which ones are needed. External access findings report resources shared outside the account or organization, which is a different analysis."
  },
  {
    "id": 157,
    "domain": 1,
    "ts": "1.2",
    "q": "A company runs about sixty AWS accounts under AWS Organizations, and new accounts are created every month. The security team wants one account to receive security findings from all existing and future member accounts, to have those accounts evaluated continuously against recognized security standards, and to avoid asking each account owner to enable or configure anything. Member accounts must not be able to disable the aggregation. Which solution meets these requirements?",
    "options": [
      "Configure each member account to publish its findings to an Amazon SNS topic owned by the security account, and subscribe a queue in that account to the topic.",
      "Designate the security account as the AWS Security Hub delegated administrator, then create a Security Hub configuration policy associated with the organization root that enables Security Hub and the required standards for all accounts.",
      "Create an Amazon EventBridge rule in each account that forwards findings to an event bus in the security account, deploy the rule with AWS CloudFormation StackSets, and enable the required standards in every account with the same stack set.",
      "Enable AWS Trusted Advisor in the management account, and review the checks in its security category every week."
    ],
    "correct": 1,
    "explanation":
      "Security Hub integrates with AWS Organizations: the management account designates a delegated administrator, which uses central configuration to associate a configuration policy with the organization root so that Security Hub and the chosen standards are enabled for every current and future account. Accounts covered by a configuration policy cannot change those settings themselves, which is what the stem requires. Publishing to an SNS topic or building per-account EventBridge rules recreates the aggregation manually and leaves each account free to remove it. Trusted Advisor provides best practice checks in a single account and is not a findings aggregator with security standards."
  },
  {
    "id": 158,
    "domain": 1,
    "ts": "1.2",
    "q": "Amazon GuardDuty reports that an Amazon EC2 instance in a company running a payment workload communicated with a known command and control host. Analysts must now determine which IAM principals used that instance role, what other resources those principals touched, and how the activity evolved over the preceding weeks. They must do so without writing queries, building a data pipeline, or deploying anything on the instance. What should a solutions architect recommend?",
    "options": [
      "Amazon Detective, to explore the finding through the behavior graph it builds from the account's activity.",
      "Amazon Inspector, to scan the instance and identify the software vulnerability that allowed the compromise.",
      "AWS Config, to review the configuration timeline of the instance and its attached role.",
      "AWS Trusted Advisor, to check whether the account follows security best practices."
    ],
    "correct": 0,
    "explanation":
      "Amazon Detective ingests AWS CloudTrail events, VPC flow logs, and GuardDuty findings and builds a behavior graph that analysts navigate to see principal activity, resource interactions, and how behavior changed over time; GuardDuty findings link directly into the Detective console. Amazon Inspector finds software vulnerabilities but does not reconstruct who did what. AWS Config shows configuration changes to resources, not the API activity of principals. Trusted Advisor gives best practice recommendations and plays no part in an investigation."
  },
  {
    "id": 159,
    "domain": 1,
    "ts": "1.2",
    "q": "A company runs a serverless application built from several hundred AWS Lambda functions that different teams update daily. The security team must be told when the dependencies packaged with a function contain a known vulnerability, and it wants that assessment to run continuously as functions are deployed and as new vulnerabilities are published, not only at release time. Findings must appear alongside the company other security findings. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Run a dependency scanner in the deployment pipeline and fail the build when a vulnerable package is detected.",
      "Enable AWS Config rules that evaluate the runtime version of each Lambda function.",
      "Schedule an AWS Lambda function that downloads each deployment package and compares its dependencies against a vulnerability feed.",
      "Enable Amazon Inspector Lambda standard scanning for the account so that functions are scanned continuously and findings are sent to AWS Security Hub."
    ],
    "correct": 3,
    "explanation":
      "Amazon Inspector scans Lambda functions continuously, evaluates the dependencies in the deployment package against known vulnerabilities, and publishes findings to AWS Security Hub without any agent or scheduled job. A pipeline scanner only covers the moment of deployment and misses vulnerabilities disclosed afterwards. AWS Config rules evaluate configuration, such as the runtime, and know nothing about package contents. A custom scanning function reproduces Inspector's job and adds code to maintain."
  },
  {
    "id": 160,
    "domain": 1,
    "ts": "1.2",
    "q": "A retailer operates twenty VPCs attached to a transit gateway, and each VPC currently reaches the internet through its own NAT gateway. An auditor requires that outbound traffic be examined at one single point, that only an approved list of destination domain names be reachable, and that packet inspection signatures be applied. The retailer will not build or operate its own appliance fleet. Which solution meets these requirements?",
    "options": [
      "Deploy AWS Network Firewall in a dedicated inspection VPC attached to the transit gateway, and route outbound traffic from every VPC through it using domain list and intrusion prevention rule groups.",
      "Deploy AWS Network Firewall endpoints in each of the twenty VPCs, and manage twenty separate sets of domain list and intrusion prevention rule groups from one account so that every VPC ends up applying the same signatures.",
      "Keep the existing NAT gateway deployed in every one of the twenty VPCs, and replace all of the workload security group outbound rules with rules that reference the approved list of destination domain names.",
      "Deploy a Gateway Load Balancer in each VPC in front of an Auto Scaling group of self-managed inspection appliances that the retailer patches."
    ],
    "correct": 0,
    "explanation":
      "AWS Network Firewall is a managed stateful firewall that supports domain list rule groups and Suricata-compatible intrusion prevention rules. Placing it in a single inspection VPC attached to the transit gateway gives the auditor the one inspection point required and removes the per-VPC NAT egress paths. Deploying firewall endpoints in all twenty VPCs technically inspects the traffic but creates twenty inspection points and twenty rule sets to keep in sync, which is not a single point of examination. Security groups filter by IP address, port, and protocol and cannot express domain names. A Gateway Load Balancer with self-managed appliances is exactly the appliance fleet the retailer refuses to operate."
  },
  {
    "id": 161,
    "domain": 1,
    "ts": "1.2",
    "q": "A company runs many accounts in an AWS Organizations organization, and application teams create new VPCs regularly without notifying the security team. The security team must guarantee that every VPC, including those created in the coming months, is protected by the same AWS Network Firewall policy. It also wants visibility into which VPCs fall out of compliance and wants those resources brought back into compliance automatically. Which solution meets these requirements?",
    "options": [
      "Designate a Firewall Manager administrator account and create a Network Firewall policy scoped to the organization, so that in-scope VPCs are protected and non-compliant resources are remediated automatically.",
      "Deploy AWS Network Firewall in each account with AWS CloudFormation StackSets, and re-run the stack set whenever an application team creates a new VPC so that the same firewall policy is applied to that VPC as well.",
      "Create an AWS Config rule in every member account of the organization that reports the VPCs without a firewall endpoint attached, and have the security team manually open a remediation ticket for each finding it produces.",
      "Attach a service control policy that denies the ec2:CreateVpc action unless the request carries a firewall tag."
    ],
    "correct": 0,
    "explanation":
      "AWS Firewall Manager works from a designated administrator account in AWS Organizations and applies security policies, including AWS Network Firewall, AWS WAF, and security group policies, across accounts. Policies apply to in-scope resources as they are created and Firewall Manager can remediate non-compliant resources automatically. StackSets can deploy resources but has no continuous compliance model and needs to be re-run. An AWS Config rule detects the gap without fixing it. Denying VPC creation based on a tag blocks work without ever deploying a firewall."
  },
  {
    "id": 162,
    "domain": 1,
    "ts": "1.2",
    "q": "A company runs an internal web application on Amazon EC2 instances behind an Application Load Balancer. Users must sign in before any request reaches the application, and the development team does not want to implement a sign-in page, session handling, or token validation in the application code. The company already manages these users in an Amazon Cognito user pool. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Add an AWS WAF web ACL to the Application Load Balancer with a rule that blocks any request that arrives without a valid session cookie, and redirect all of the blocked requests to a hosted sign-in page.",
      "Configure an authenticate-cognito action on the Application Load Balancer HTTPS listener so that the load balancer authenticates users against the user pool before forwarding requests.",
      "Put Amazon API Gateway in front of the Application Load Balancer, and attach an Amazon Cognito authorizer to that API.",
      "Assign each authenticated user an IAM role through an Amazon Cognito identity pool, and have the application code exchange the user pool token for those credentials on each incoming request instead."
    ],
    "correct": 1,
    "explanation":
      "An Application Load Balancer HTTPS listener can perform user authentication itself with an authenticate-cognito action, redirecting unauthenticated users to the user pool's hosted sign-in page and passing user claims to the targets, so the application handles no tokens or sessions. AWS WAF inspects requests but cannot authenticate a user or issue a session. Placing API Gateway in front of the load balancer adds a component and still requires the client to obtain and send a token. Identity pools hand out AWS credentials for calling AWS APIs, which is not what a browser-based web session needs."
  },
  {
    "id": 163,
    "domain": 1,
    "ts": "1.2",
    "q": "A company runs dozens of microservices in a VPC and requires TLS on every internal connection, with each service presenting a certificate that the others validate against a certificate authority the company controls. The certificates must never be trusted by public clients, and the team wants AWS to manage the certificate authority infrastructure and the renewal of the service certificates. Which solution meets these requirements?",
    "options": [
      "Request public certificates from AWS Certificate Manager for each internal service hostname.",
      "Store a self-signed certificate for each service in AWS Secrets Manager and rotate it with a Lambda function.",
      "Run an open source certificate authority on an Amazon EC2 instance and distribute its root certificate to the services.",
      "Create a private certificate authority with AWS Private Certificate Authority and issue certificates to the services through AWS Certificate Manager."
    ],
    "correct": 3,
    "explanation":
      "AWS Private Certificate Authority creates a managed private CA whose root is trusted only by the systems the company configures, and certificates issued through AWS Certificate Manager for private CAs are renewed automatically. Public ACM certificates are issued by a publicly trusted CA and require domain validation on a public domain, which does not fit an internal-only trust chain. Self-signed certificates in Secrets Manager put the whole issuance and rotation burden on custom code. A self-run CA on EC2 works but the company asked AWS to manage the CA infrastructure."
  },
  {
    "id": 164,
    "domain": 1,
    "ts": "1.2",
    "q": "A company runs several hundred Amazon EC2 instances that run both Linux and Windows in private subnets with no inbound access from the internet. The security team must apply operating system patches during a defined weekly window, exclude a small set of patches that are known to break an internal application, and produce a report showing which instances are missing approved patches. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Build a new AMI every month with the latest operating system patches, and replace the instances through an Auto Scaling group instance refresh during the weekly window.",
      "Enable Amazon Inspector so that it scans the instances for vulnerabilities, and then have it automatically install the operating system updates that its scan finds are missing.",
      "Use AWS Systems Manager Patch Manager with a custom patch baseline that excludes the problematic patches, and associate a maintenance window with the target instances.",
      "Run a scheduled AWS Lambda function that opens an SSH session to each of the instances and runs its package manager."
    ],
    "correct": 2,
    "explanation":
      "Patch Manager applies patches on a schedule through maintenance windows, uses patch baselines that can approve or explicitly reject specific patches, and reports patch compliance per instance; it works through the SSM Agent, so no inbound access is needed. Rebuilding AMIs monthly is a valid immutable strategy but is far more work and does not produce per-instance patch compliance data. Amazon Inspector reports vulnerabilities and does not install patches. A Lambda function opening SSH sessions requires network paths and key management and reimplements Patch Manager."
  },
  {
    "id": 165,
    "domain": 1,
    "ts": "1.2",
    "q": "A company wants to know whether malware is present on the Amazon EBS volumes attached to an Amazon EC2 instance whenever Amazon GuardDuty raises a finding suggesting that the instance is compromised. The security team does not want to install or maintain any software on the instances, the scan must not disturb the running workload, and the results must be available without an analyst starting the process manually. Which solution meets these requirements?",
    "options": [
      "Enable GuardDuty-initiated malware scan in Malware Protection for EC2 so that GuardDuty runs an agentless scan of the Amazon EBS volumes attached to the instance when such a finding is generated.",
      "Install a third-party antivirus agent on every instance through AWS Systems Manager, schedule daily scans, and forward the results to the security team so that no analyst has to start a scan by hand.",
      "Enable Amazon Macie on the account and on every Amazon S3 bucket that is located in the same AWS Region, so that it inspects the contents of the Amazon EBS volumes attached to the instance for malicious files.",
      "Enable Amazon Inspector so that it scans the file system of the instance for malware signatures after each finding is raised."
    ],
    "correct": 0,
    "explanation":
      "With GuardDuty-initiated malware scan, whenever GuardDuty produces a finding that indicates the potential presence of malware, it automatically starts an agentless scan of the Amazon EBS volumes attached to the affected instance, so nothing is installed on the instance and the service is designed not to affect the resource's performance. Deploying an antivirus agent conflicts with the requirement to install no software. Amazon Macie discovers and classifies sensitive data in Amazon S3 and does not read EBS volumes. Amazon Inspector reports software vulnerabilities and unintended network exposure, not malware."
  },
  {
    "id": 166,
    "domain": 1,
    "ts": "1.2",
    "q": "A company wants to detect signs that an IAM access key has been used by an attacker, such as calls from an unusual location or reconnaissance API activity, and it wants an automated action to run on the detection instead of waiting for an analyst. The company does not want to build its own detection logic or install agents. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Enable Amazon GuardDuty in the account so that it analyzes AWS CloudTrail, DNS, and VPC flow log activity for suspicious behavior.",
      "Create an Amazon EventBridge rule that matches GuardDuty findings above a severity threshold and invokes an AWS Lambda function that revokes the credentials.",
      "Create an Amazon Athena table over the AWS CloudTrail logs and run a scheduled query that looks for calls from unexpected countries.",
      "Enable AWS Config with a rule that checks the age of every IAM access key.",
      "Subscribe the security team to an Amazon SNS topic that receives the AWS CloudTrail log delivery notifications."
    ],
    "correct": [0, 1],
    "explanation":
      "Amazon GuardDuty continuously analyzes CloudTrail management events, VPC flow logs, and DNS logs and produces findings such as credential use from an unusual location, with no agents and no detection logic to write. GuardDuty findings are delivered to Amazon EventBridge, so a rule filtered on severity can invoke a Lambda function that disables the key without human intervention. Scheduled Athena queries mean writing and maintaining the detection logic and add minutes or hours of delay. An AWS Config rule on key age is hygiene, not compromise detection. CloudTrail delivery notifications tell the team that a log file arrived, not that anything suspicious happened."
  },
  {
    "id": 167,
    "domain": 1,
    "ts": "1.2",
    "q": "A company serves a public web application from an Application Load Balancer in a single AWS Region. Legal counsel requires that requests originating from two specific countries be rejected before they reach the application, and the security team also wants to keep blocking common exploit patterns such as SQL injection. The application must remain reachable from every other country, and the application code must not change. Which solution meets these requirements?",
    "options": [
      "Configure Amazon Route 53 geolocation routing so that the DNS queries that originate from those two countries receive no answer at all for the record of the application.",
      "Associate an AWS WAF web ACL with the load balancer that contains a geographic match rule blocking those countries, alongside the AWS managed rule groups.",
      "Add network ACL entries on the public subnets that deny each of the IP ranges published as allocated to those two countries by the regional internet registries.",
      "Enable CloudFront geographic restrictions directly on the Application Load Balancer."
    ],
    "correct": 1,
    "explanation":
      "AWS WAF supports a geographic match statement that blocks requests by country and can be combined with managed rule groups for common exploits in the same web ACL, and a web ACL associates directly with an Application Load Balancer. Route 53 geolocation routing selects a record to return and is trivially bypassed by anyone resolving the load balancer name directly, so it is not a security control. Maintaining country IP ranges in network ACLs is error-prone and hits the rule count limits. Geographic restrictions are a CloudFront feature and cannot be applied to a load balancer."
  },
  {
    "id": 168,
    "domain": 1,
    "ts": "1.3",
    "q": "A company has thousands of Amazon S3 buckets spread across the member accounts of its AWS Organizations organization. The compliance team must know, on an ongoing basis, which buckets hold sensitive data such as credit card numbers or health identifiers. The results must be centralized in one security account, and account owners must not have to configure anything, including in accounts created later. Which solution meets these requirements?",
    "options": [
      "Enable server access logging on every bucket, and analyze the logs with Amazon Athena to identify the objects that hold sensitive data.",
      "Run an AWS Glue crawler over every bucket on a schedule, inspect the resulting AWS Glue Data Catalog schemas for the columns that hold sensitive data, and copy the findings into the security account.",
      "Designate a delegated administrator account for Amazon Macie, enable Macie for the organization with automatic enablement for new accounts, and configure automated sensitive data discovery.",
      "Enable Amazon GuardDuty S3 Protection in each account, and review the findings from the management account of the organization."
    ],
    "correct": 2,
    "explanation":
      "Amazon Macie uses machine learning and pattern matching to discover and classify sensitive data in Amazon S3, and it integrates with AWS Organizations through a delegated administrator that enables Macie for existing and new accounts and centralizes the findings. Server access logs record requests, not object contents. A Glue crawler infers schemas and does not classify sensitive values. GuardDuty S3 Protection analyzes data access activity for suspicious behavior; it does not tell you what the objects contain."
  },
  {
    "id": 169,
    "domain": 1,
    "ts": "1.3",
    "q": "A company stores project documents in a versioned Amazon S3 bucket. Because of pending litigation, a specific set of objects must be preserved with no end date, and no user may delete or overwrite them while the matter is open. When the litigation closes, a designated compliance officer must be able to lift the protection so that the normal lifecycle rules apply again. Which solution meets these requirements?",
    "options": [
      "Apply an S3 Object Lock retention in Compliance mode with a ten-year retention period on each of the affected object versions, and record the litigation reference in the object metadata.",
      "Copy the affected objects to a separate bucket, and enable S3 Block Public Access on that bucket.",
      "Add a bucket policy that denies s3:DeleteObject for every principal except the compliance officer, and attach that policy directly to the bucket resource that stores the affected objects.",
      "Enable S3 Object Lock on the bucket and apply a legal hold to the affected object versions, granting the compliance officer the s3:PutObjectLegalHold permission."
    ],
    "correct": 3,
    "explanation":
      "An S3 Object Lock legal hold protects an object version indefinitely, has no retention period, and remains in place until a principal with the s3:PutObjectLegalHold permission removes it, which matches an open-ended litigation hold that must later be lifted. Compliance mode retention cannot be shortened or removed by anyone, including the root user, so the protection could not be lifted when the matter closes. Copying objects and blocking public access does nothing to prevent deletion. A bucket policy can be edited or overridden by anyone able to change it, so it is not a durable retention control."
  },
  {
    "id": 170,
    "domain": 1,
    "ts": "1.3",
    "q": "A company stores customer records in Amazon S3. An analytics application must read the same objects as the production application, but every value that identifies an individual must be masked in the data the analytics application receives. The company wants to avoid keeping a second, redacted copy of the dataset and does not want to change the analytics application's use of the S3 GET API. Which solution meets these requirements?",
    "options": [
      "Apply a bucket policy condition that denies the analytics role access to the sensitive attributes of each object.",
      "Configure an S3 event notification that triggers a Lambda function to write a redacted copy of each object into a second bucket for the analytics application.",
      "Create an S3 Object Lambda access point over the bucket and attach a Lambda function that redacts the identifying values in the GetObject response.",
      "Enable server-side encryption with a separate AWS KMS key and withhold the key from the analytics application."
    ],
    "correct": 2,
    "explanation":
      "S3 Object Lambda runs a Lambda function as part of the GetObject request and returns the transformed bytes to the caller, so the analytics application keeps using a standard GET while a single stored copy of the data is redacted on the fly. Writing a redacted copy into a second bucket duplicates the dataset and creates a synchronization problem, which the company wants to avoid. A bucket policy authorizes whole objects and cannot filter values inside them. Withholding a KMS key makes the object unreadable rather than partially masked, so the analytics application gets nothing."
  },
  {
    "id": 171,
    "domain": 1,
    "ts": "1.3",
    "q": "A company encrypts objects in an Amazon S3 bucket with a customer managed AWS KMS key in the production account. A partner application running in a second AWS account must be able to read those objects. The security team wants the production account to keep control of the key and to be able to revoke the partner's ability to decrypt at any time from a single place. Which solution meets these requirements?",
    "options": [
      "Copy the key material of the customer managed key into a new AWS KMS key that is created in the partner account, and let the partner manage the key policy there.",
      "Update the KMS key policy to allow the partner role to call kms:Decrypt, have the partner account grant that role kms:Decrypt on the key in an IAM policy, and grant the role access to the objects in the bucket policy.",
      "Switch the bucket to server-side encryption with Amazon S3 managed keys so that the partner needs no AWS KMS permissions at all, and grant the partner role access to the objects in the bucket policy of the production account.",
      "Attach an IAM policy in the partner account that allows kms:Decrypt on the production key ARN, and grant the partner role access to the objects in the bucket policy."
    ],
    "correct": 1,
    "explanation":
      "Access to a KMS key requires the key policy in the key's own account to allow the external principal; the production account can add or remove that statement at any time, which is the single revocation point the team wants. The partner also needs permission on the objects themselves through the bucket policy. Key material cannot be copied out of AWS KMS. Switching to S3 managed keys removes the company's control over key access entirely. An IAM policy in the partner account alone is not sufficient, because a cross-account grant requires the resource policy on the key as well. Cross-account access to a KMS key requires both the key policy and an IAM policy in the partner account; the key policy remains the single place where the company revokes access."
  },
  {
    "id": 172,
    "domain": 1,
    "ts": "1.3",
    "q": "An internal policy requires that the key material used to encrypt objects in Amazon S3 be replaced on a recurring schedule, and that objects encrypted with older key material stay readable without any re-encryption work. The team encrypts the objects with a symmetric customer managed AWS KMS key whose key material AWS KMS generated. The team does not want to change application code or update any key identifier. Which solution meets these requirements?",
    "options": [
      "Create a new customer managed key each year, and update the default encryption configuration of the bucket to point at the new key so that later objects use the newer material.",
      "Import new key material into the existing customer managed key every year, and delete the key material from the previous year manually through the KMS console.",
      "Enable automatic key rotation on the customer managed key so that AWS KMS creates new key material and retains the previous material for decryption.",
      "Schedule deletion of the existing key, and recreate it afterwards with the same alias."
    ],
    "correct": 2,
    "explanation":
      "Automatic rotation on a symmetric customer managed key with AWS KMS generated key material creates new key material on the rotation schedule while keeping the older material, so previously encrypted objects are decrypted transparently. The key ID, ARN, and alias do not change, so nothing in the application is updated. Creating a new key each year leaves old objects tied to old keys and requires configuration changes. Deleting imported key material makes every object encrypted under it unreadable. Scheduling deletion of the key destroys access to all data encrypted with it."
  },
  {
    "id": 173,
    "domain": 1,
    "ts": "1.3",
    "q": "A regulated company must ensure that the key material protecting its data is generated and stored in single-tenant hardware security modules that the company alone controls, while its applications continue to use AWS KMS APIs and existing AWS service integrations such as encrypted Amazon EBS volumes. The company does not want to rewrite the applications to call a different cryptographic API. Which solution meets these requirements?",
    "options": [
      "Use an AWS KMS key with imported key material, and re-import that same key material from the company's own key management system on a recurring schedule.",
      "Use an AWS managed key, and enable AWS CloudTrail logging of every use of that key.",
      "Run a software key manager on Amazon EC2 instances in a dedicated AWS account, and have the applications call that key manager directly for every operation.",
      "Create an AWS CloudHSM cluster and configure an AWS KMS custom key store backed by that cluster, then create the KMS keys in that key store."
    ],
    "correct": 3,
    "explanation":
      "A KMS custom key store backed by an AWS CloudHSM cluster stores the key material in the company's dedicated, single-tenant HSMs while the keys are still used through the AWS KMS API, so AWS service integrations such as encrypted EBS volumes keep working unchanged. Imported key material still resides in AWS KMS multi-tenant infrastructure and does not provide dedicated HSMs. An AWS managed key is controlled by the service, not the customer. A self-run key manager on EC2 would require rewriting the applications and forfeits the AWS service integrations."
  },
  {
    "id": 174,
    "domain": 1,
    "ts": "1.3",
    "q": "A company must demonstrate to an external auditor that its AWS environment satisfies a recognized compliance framework. The team currently gathers screenshots and configuration exports by hand before each audit, which takes weeks. It wants the evidence to be collected continuously from the accounts in scope, mapped to the framework's controls, and packaged into a report for the auditor. What should a solutions architect recommend?",
    "options": [
      "AWS Audit Manager, using a prebuilt framework to create an assessment that collects evidence automatically and generates an assessment report.",
      "AWS Artifact, to download the compliance reports that cover the workloads of the company and hand the relevant ones to the external auditor before the audit.",
      "AWS Config, to record the configuration history of each resource in the accounts that are in scope, using a configuration recorder in every account.",
      "AWS Security Hub, to run the security standard checks across every account in scope and export their findings to Amazon S3 for the auditor to review later."
    ],
    "correct": 0,
    "explanation":
      "AWS Audit Manager provides prebuilt frameworks whose controls map to a compliance standard, runs continuous resource assessments to collect evidence automatically for the accounts in scope, and builds an assessment report for the auditor. AWS Artifact provides AWS's own audit reports about AWS infrastructure, not evidence about the customer's workloads. AWS Config records configuration changes and is in fact one of Audit Manager's evidence sources, but it does not map evidence to a framework or produce an audit report. Security Hub reports on security posture rather than assembling audit evidence packages."
  },
  {
    "id": 175,
    "domain": 1,
    "ts": "1.3",
    "q": "During a vendor security review, a customer asks a company for the AWS SOC 2 Type II report covering the AWS services the company uses. The company must obtain the report itself, on demand and from its own AWS account, rather than opening a support case and waiting for AWS to respond. Which solution meets these requirements?",
    "options": [
      "Generate the report from AWS Audit Manager using the SOC 2 prebuilt framework.",
      "Download the AWS SOC 2 Type II report from AWS Artifact.",
      "Export the AWS Security Hub findings for the AWS Foundational Security Best Practices standard.",
      "Retrieve the report from Amazon S3 in the AWS compliance program's public bucket."
    ],
    "correct": 1,
    "explanation":
      "AWS Artifact is the self-service portal for AWS compliance artifacts, providing on-demand access to AWS audit reports such as the SOC and ISO reports from within the account. AWS Audit Manager assesses the customer own environment against a framework and cannot produce the AWS audit report. Security Hub findings describe the customer resources and are not an attestation about AWS. AWS does not publish these reports in a public bucket; they are distributed through AWS Artifact and are covered by its terms."
  },
  {
    "id": 176,
    "domain": 1,
    "ts": "1.3",
    "q": "An existing Amazon RDS for MySQL database instance was created several years ago without encryption. A new compliance rule requires that the data be encrypted at rest with a customer managed AWS KMS key. The application can tolerate a short maintenance window, and the team wants to keep the same data set and the same database engine version. What should a solutions architect do to accomplish this?",
    "options": [
      "Modify the database instance, and enable the encryption option with the customer managed key during the next maintenance window.",
      "Enable encryption on the underlying Amazon EBS volumes of the database instance from the Amazon EC2 console, and reboot the instance so that it reattaches the encrypted volumes.",
      "Take a snapshot of the instance, copy the snapshot while specifying the customer managed key, restore a new instance from the encrypted copy, and point the application at it.",
      "Create a read replica with encryption enabled, and promote the replica to be the primary instance once it has caught up with the source."
    ],
    "correct": 2,
    "explanation":
      "Encryption cannot be turned on for an existing unencrypted RDS instance. The supported path is to snapshot the instance, create an encrypted copy of that snapshot with the chosen KMS key, restore a new instance from the encrypted copy, and switch the application to it during a short window. The modify operation does not expose an encryption setting for an existing instance. The storage of an RDS instance is managed by the service and is not modified directly. A read replica of an unencrypted instance cannot be encrypted, so promoting one does not produce an encrypted database."
  },
  {
    "id": 177,
    "domain": 1,
    "ts": "1.3",
    "q": "A company writes millions of small objects per day to an Amazon S3 bucket that uses server-side encryption with an AWS KMS customer managed key. The finance team notices that AWS KMS request charges have become a significant part of the bill. The company must keep using its own KMS key and must not weaken encryption at rest. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Switch the default encryption of the bucket to server-side encryption with Amazon S3 managed keys, removing the customer managed KMS key.",
      "Disable automatic key rotation on the customer managed KMS key that protects the objects, and leave the current key material in place for now.",
      "Aggregate the small objects into larger archive files before uploading them to the bucket, and stop using a customer managed key for the bucket.",
      "Enable S3 Bucket Keys on the bucket so that Amazon S3 uses a short-lived bucket-level key and issues fewer requests to AWS KMS."
    ],
    "correct": 3,
    "explanation":
      "S3 Bucket Keys let Amazon S3 obtain a time-limited bucket-level key from AWS KMS and use it to protect new objects, which sharply reduces the number of KMS requests and therefore their cost, while the objects remain encrypted with the customer managed key. Switching to S3 managed keys abandons the customer managed key the company must keep. Key rotation is not billed per request and disabling it saves nothing meaningful. Aggregating objects changes the application's data model and the option also drops the required customer managed key."
  },
  {
    "id": 178,
    "domain": 1,
    "ts": "1.3",
    "q": "A company keeps contract documents in an Amazon S3 bucket. Several objects were recently lost when a user deleted them by mistake, and the company wants both to be able to recover a previous state of any object and to make permanent deletion of an object version require an additional authentication factor. The bucket is managed by the account root user. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Enable S3 Versioning on the bucket so that overwritten and deleted objects can be recovered.",
      "Enable S3 Replication to a bucket in a second AWS Region so that a copy of every object is kept in a destination bucket that the delete request did not target.",
      "Enable MFA delete on the bucket so that permanently deleting an object version requires a multi-factor authentication code.",
      "Enable S3 Block Public Access on the bucket so that no object can be reached anonymously.",
      "Add an S3 Lifecycle rule that expires noncurrent object versions after seven days to keep the storage cost of the retained versions down."
    ],
    "correct": [0, 2],
    "explanation":
      "S3 Versioning keeps every version of an object, so a deletion only adds a delete marker and earlier versions can be restored. MFA delete, which is configured by the bucket owner's root user on a versioned bucket, requires a multi-factor authentication code to permanently delete a version or to suspend versioning. Replication copies objects elsewhere but propagates nothing that stops a version from being deleted in the destination by another mistake, and it does not add an authentication factor. Block Public Access controls anonymous and cross-account exposure, not deletion. A lifecycle rule that expires noncurrent versions would destroy the very versions needed for recovery."
  },
  {
    "id": 2,
    "domain": 2,
    "ts": "2.1",
    "q": "An application stores user session data in a relational database. During traffic spikes the database becomes the bottleneck. A solutions architect must move the session data to a highly available store that returns reads with sub-millisecond latency. Which solution meets these requirements?",
    "options": [
      "Convert the database to a Multi-AZ DB instance deployment, and continue to store the session data in it so that the loss of the primary does not interrupt the session store.",
      "Store the session data in an Amazon DynamoDB table that uses on-demand capacity mode so that it absorbs the traffic spikes without any capacity planning, replicated in three AZs.",
      "Store each user session as an object in an Amazon S3 bucket, and read that object on every request the application serves, using the session ID as the object's key name.",
      "Store the session data in an Amazon ElastiCache for Redis replication group that has replicas in other Availability Zones and Multi-AZ automatic failover enabled."
    ],
    "correct": 3,
    "explanation":
      "ElastiCache for Redis serves reads from memory with sub-millisecond latency, and a replication group with replicas in other Availability Zones and Multi-AZ enabled promotes a replica automatically, typically within a few seconds, so the store stays available. A Multi-AZ DB instance deployment improves database availability but leaves the same relational bottleneck and the same disk-based latency. DynamoDB is durable and scales well, but its read latency is single-digit milliseconds, not sub-millisecond. Reading a session object from Amazon S3 on every request adds far more latency than the database lookup it replaces."
  },
  {
    "id": 4,
    "domain": 2,
    "ts": "2.2",
    "q": "A company runs a business-critical application on Amazon EC2 instances in a single Availability Zone. The application must tolerate the failure of an entire Availability Zone, and the application code cannot be changed. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Replace the instances with a larger EC2 instance type in the same Availability Zone.",
      "Place the instances in an Auto Scaling group that spans subnets in at least two Availability Zones.",
      "Attach an Amazon EBS io2 volume that has Multi-Attach enabled to every instance.",
      "Register the instances with an Application Load Balancer that has the same Availability Zones enabled.",
      "Create an Amazon Machine Image (AMI) of an instance and copy the AMI to a second AWS Region."
    ],
    "correct": [1, 3],
    "explanation":
      "An Auto Scaling group that spans several Availability Zones keeps capacity in more than one zone and replaces instances that fail, and an Application Load Balancer with those zones enabled sends requests only to healthy targets, so the loss of a zone is absorbed without any code change. A larger instance in the same zone keeps the same single point of failure. EBS Multi-Attach only attaches a volume to instances that are in the same Availability Zone as the volume, so it cannot span zones. Copying an AMI to another Region helps a later manual rebuild but does nothing automatically when a zone fails."
  },
  {
    "id": 9,
    "domain": 2,
    "ts": "2.2",
    "q": "A company is creating an Amazon Aurora MySQL-Compatible Edition DB cluster for an application in which an operator occasionally runs a destructive data manipulation statement. When that happens, the same cluster must be rewound to a point in time shortly before the statement, within minutes and without provisioning a second cluster. Which solution meets these requirements?",
    "options": [
      "Take a manual DB cluster snapshot every hour and restore the most recent snapshot after a destructive statement.",
      "Create a cross-Region read replica of the DB cluster and promote it after a destructive statement.",
      "Enable the Backtrack feature when the DB cluster is created and set a target backtrack window that covers the time needed to notice the mistake.",
      "Restore the DB cluster to a point in time from its automated backups after a destructive statement."
    ],
    "correct": 2,
    "explanation":
      "Backtracking rewinds an Aurora MySQL DB cluster to a time you specify without restoring data from a backup: it does not launch a new DB cluster and it completes in minutes, which is what makes it the answer to undoing a DELETE without a WHERE clause. Backtracking must be enabled when the cluster is created or when a snapshot is restored, so the design decision belongs at creation time, as in this scenario. Snapshot restore and point-in-time restore both create a new DB cluster from backup data, which the requirements exclude and which takes far longer. Promoting a cross-Region read replica does not undo the statement, because the replica has already applied it."
  },
  {
    "id": 13,
    "domain": 2,
    "ts": "2.1",
    "q": "A web application accepts image uploads from users. Resizing an image must not delay the response returned to the user, and no resizing task can be lost during sudden traffic spikes. Which solution meets these requirements?",
    "options": [
      "Upload the images to an Amazon S3 bucket, configure an S3 event notification that sends a message to an Amazon SQS queue, and consume the queue from an Auto Scaling group of worker instances.",
      "Have the web tier call the resizing component synchronously, and return the response only once the resized image has been written, so that the user always receives a link to the finished image.",
      "Write the uploaded images to an Amazon RDS DB instance, and resize them with a batch job that runs every hour.",
      "Publish each upload to an Amazon SNS topic that invokes the resizing component directly for every message it receives."
    ],
    "correct": 0,
    "explanation":
      "Writing the image to Amazon S3 and letting an S3 event notification place a message on an SQS queue decouples the two tiers: the response is returned as soon as the upload finishes, the queue holds the backlog during a spike, and the workers scale on queue depth without dropping tasks. A synchronous call keeps the tiers coupled, so the user waits for the resize and a worker failure fails the request. Storing images in a relational database and processing them hourly adds up to an hour of delay and uses Amazon RDS as a file store. An SNS topic invokes the component immediately but keeps no durable backlog, so deliveries that keep failing during a spike are retried and then discarded unless a queue absorbs them."
  },
  {
    "id": 16,
    "domain": 2,
    "ts": "2.1",
    "q": "An order service emits an event for every new order. Three independent downstream services must each receive a copy of every event and process it at their own pace, and a slow or failing downstream service must not delay the other two or the order service. Which solution meets these requirements?",
    "options": [
      "Have the order service write each event to one Amazon SQS queue and have the three downstream services poll that queue.",
      "Have the order service call the three downstream services synchronously and retry the calls that fail.",
      "Have the order service write each event to an Amazon DynamoDB table and have the three downstream services scan the table on a schedule.",
      "Publish each event to an Amazon SNS topic and subscribe one Amazon SQS queue per downstream service to the topic."
    ],
    "correct": 3,
    "explanation":
      "Subscribing one SQS queue per consumer to an SNS topic is the fanout pattern: a single publish delivers a copy of the message to every subscribed queue, and each consumer drains its own queue at its own rate, so a slow consumer only builds a backlog in its own queue. A single shared queue does not work, because the three services would compete for the same messages and each message would be processed once overall instead of once per service. Synchronous calls couple the order service to the availability of all three consumers. A DynamoDB table with scheduled scans adds polling logic, full table scans, and delivery bookkeeping that the messaging services already provide."
  },
  {
    "id": 20,
    "domain": 2,
    "ts": "2.2",
    "q": "An Amazon Aurora DB cluster has a primary instance and several Aurora Replicas of different instance sizes; two of the replicas are small and serve only ad hoc queries. During the last automatic failover, one of the small replicas was promoted and the application ran with degraded write performance until an operator intervened. Failovers must promote a designated large replica first. Which solution meets these requirements?",
    "options": [
      "Assign the designated large replica the highest failover priority tier and assign the small replicas lower priority tiers.",
      "Delete the small Aurora Replicas and run the ad hoc queries against the primary instance.",
      "Point the application at the reader endpoint of the DB cluster so that it always reaches a large instance.",
      "Increase the backup retention period of the DB cluster so that Amazon RDS keeps more failover candidates."
    ],
    "correct": 0,
    "explanation":
      "Each Aurora Replica has a failover priority from 0, the highest priority, to 15, the lowest, and Amazon RDS promotes the replica with the highest priority when the primary instance fails. Placing the designated replica alone in the highest tier makes it the failover target, and changing a priority does not itself trigger a failover. Deleting the small replicas removes the read capacity the ad hoc queries need and still leaves the promotion order to chance among the remaining replicas. The reader endpoint balances read connections across replicas and has no effect on which instance becomes the primary. The backup retention period governs point-in-time restore, not failover target selection."
  },
  {
    "id": 25,
    "domain": 2,
    "ts": "2.1",
    "q": "An application served by an Auto Scaling group has a load that rises every weekday morning and falls every evening, with smaller unpredictable spikes on top of that pattern. The instances take a long time to initialize, so the existing dynamic scaling policy adds capacity only after the morning ramp has already degraded response times. Which solution meets these requirements?",
    "options": [
      "Replace the dynamic scaling policy with scheduled scaling actions for each hour of the weekday.",
      "Raise the minimum capacity of the Auto Scaling group to the level the application needs at the daily peak.",
      "Shorten the period of the Amazon CloudWatch alarm that the dynamic scaling policy uses.",
      "Add a predictive scaling policy to the Auto Scaling group and keep the dynamic scaling policy in place."
    ],
    "correct": 3,
    "explanation":
      "Predictive scaling analyzes historical load to detect daily and weekly patterns and increases capacity ahead of the forecast load, which is exactly what an application with a recurring ramp and long instance initialization needs. Keeping the dynamic policy alongside it covers the spikes the forecast does not anticipate. Scheduled scaling would require someone to maintain the schedule by hand and still reacts to nothing outside it. Running at peak capacity all day removes the elasticity that the Auto Scaling group exists for. A shorter alarm period makes the dynamic policy react sooner but does not shorten the instance initialization time, so capacity still arrives after the ramp has begun."
  },
  {
    "id": 29,
    "domain": 2,
    "ts": "2.1",
    "q": "An order service publishes every order event to a single Amazon SNS topic. Four downstream services subscribe through their own Amazon SQS queues, but each one is interested in a small subset of the events: the fraud service only wants orders above a value threshold, and the international shipping service only wants orders whose destination country is outside the home country. Today every service receives every event and discards most of them, which wastes queue and compute capacity. Which solution meets these requirements with the LEAST operational overhead?",
    "options": [
      "Create one Amazon SNS topic per event category and have the publisher decide which topic to publish each order to.",
      "Apply a filter policy to each Amazon SNS subscription so that Amazon SNS delivers only the messages whose attributes match that subscriber.",
      "Insert an AWS Lambda function between the topic and the queues to inspect each message and forward it to the relevant queues.",
      "Enable content-based deduplication on the topic so that each subscriber receives each order only once."
    ],
    "correct": 1,
    "explanation":
      "An Amazon SNS subscription filter policy is evaluated by Amazon SNS against the message attributes or the message body, and only matching messages are delivered to that subscription, so the filtering happens in the service and the subscribers stop paying to receive and discard events. The publisher is unchanged. Splitting the topic by category pushes routing logic into the publisher, which then has to change every time a subscriber changes its interest. A Lambda router is code to write, monitor and pay for, doing what a filter policy does declaratively. Content-based deduplication is a FIFO topic feature about repeated publishes of the same message, not about which subscriber wants which event."
  },
  {
    "id": 33,
    "domain": 2,
    "ts": "2.1",
    "q": "An application runs on Amazon EC2 instances in an Auto Scaling group. Each new instance writes a large amount of data to its local disk on first boot and needs many minutes before it can serve requests. Traffic bursts arrive without warning, and the group cannot bring capacity into service fast enough during a burst. Which solution meets these requirements?",
    "options": [
      "Increase the health check grace period of the Auto Scaling group so that instances are not replaced while they initialize, and lengthen the cooldown so that a burst does not trigger further launches.",
      "Create a scheduled scaling action that raises the desired capacity at the start of every hour of the working day.",
      "Add a warm pool to the Auto Scaling group and keep its pre-initialized instances in the Stopped state, using a lifecycle hook so that they are stopped only after initialization finishes.",
      "Replace the scaling policy with a step scaling policy that adds a larger number of instances at each step of the alarm, where each step is defined by a range of values above the alarm threshold."
    ],
    "correct": 2,
    "explanation":
      "A warm pool is a pool of pre-initialized instances that sits alongside the Auto Scaling group; a scale-out event draws instances from the pool instead of launching them, which is the documented answer for applications with exceptionally long boot times. Keeping the pool instances in the Stopped state means the company pays for their volumes rather than for running instances, and a lifecycle hook keeps an instance in a wait state until its initialization has finished. A longer health check grace period only stops Amazon EC2 Auto Scaling from replacing an instance that is still initializing; it does not make capacity available any sooner. Scheduled scaling cannot anticipate bursts that arrive without warning. A step policy launches more instances at once, but each of them still spends many minutes writing its data before it can serve requests."
  },
  {
    "id": 37,
    "domain": 2,
    "ts": "2.1",
    "q": "Every object uploaded to an Amazon S3 bucket must be processed as soon as it arrives, and the bucket must not be polled. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Run a task every minute that calls ListObjectsV2 on the bucket and processes the keys it has not seen before, tracking the seen keys.",
      "Enable S3 Versioning on the bucket and process the newest version of each object.",
      "Configure an S3 event notification for the s3:ObjectCreated:* event type that invokes an AWS Lambda function.",
      "Enable Amazon S3 Storage Lens on the bucket and process the objects listed in the daily metrics export."
    ],
    "correct": 2,
    "explanation":
      "An S3 event notification on object creation invokes the Lambda function as soon as the object is written, with no polling and no servers to operate. Listing the bucket on a schedule adds latency, costs a LIST request on every run, and gets slower as the bucket grows. Versioning records object history and starts no processing. S3 Storage Lens produces storage analytics on a daily cadence, not per-object events."
  },
  {
    "id": 40,
    "domain": 2,
    "ts": "2.2",
    "q": "A production Amazon RDS for PostgreSQL Single-AZ DB instance must fail over automatically to another Availability Zone with no operator action. In addition, reporting queries must run on the standby capacity through a reader endpoint, and the team does not want to create and manage separate read replicas. Which solution meets these requirements?",
    "options": [
      "Convert the deployment to a Multi-AZ DB instance deployment and send the reporting queries to the standby DB instance.",
      "Create two read replicas in other Availability Zones and promote one of them when the primary fails.",
      "Convert the deployment to a Multi-AZ DB instance deployment and add a read replica in a third Availability Zone for the reporting queries.",
      "Convert the deployment to a Multi-AZ DB cluster deployment, which has a writer DB instance and two readable standby DB instances in three Availability Zones."
    ],
    "correct": 3,
    "explanation":
      "A Multi-AZ DB cluster deployment has a writer DB instance and two reader DB instances in three Availability Zones in the same Region. The reader DB instances are automatic failover targets and also serve read traffic, so one deployment satisfies both the automatic failover requirement and the reporting requirement without any separate replicas to manage. In a Multi-AZ DB instance deployment the standby is not readable, so sending reports to it is not possible. Promoting a read replica is a manual action, which the requirement for no operator action rules out. Adding a read replica alongside a Multi-AZ DB instance works technically but leaves the team creating and managing a separate replica, which the requirements exclude."
  },
  {
    "id": 44,
    "domain": 2,
    "ts": "2.2",
    "q": "A company must keep an automatic, continuously updated copy of every object in an Amazon S3 bucket in a bucket that is located in a second AWS Region. Which solution meets these requirements?",
    "options": [
      "Create an S3 Lifecycle rule that transitions the objects to the S3 Glacier Flexible Retrieval storage class.",
      "Configure S3 Same-Region Replication to a second bucket and enable S3 Versioning on both buckets.",
      "Run an AWS DataSync task once a week that copies the contents of the bucket to the second bucket.",
      "Configure S3 Cross-Region Replication to a bucket in the second Region and enable S3 Versioning on both buckets."
    ],
    "correct": 3,
    "explanation":
      "Cross-Region Replication copies new and updated objects to a destination bucket in another Region automatically and asynchronously, and versioning on the source and destination buckets is a prerequisite for it. A lifecycle rule changes the storage class of objects and leaves them in the same bucket and Region. Same-Region Replication creates the second copy inside the original Region. A weekly DataSync task is a copy job rather than continuous replication, so the destination can be a week behind."
  },
  {
    "id": 201,
    "domain": 2,
    "ts": "2.2",
    "q": "A business-critical web application runs on Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer, and every component is in a single Availability Zone. The company must remove this single point of failure. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Create an Amazon Machine Image (AMI) of each instance and store the AMIs in a second AWS Region.",
      "Replace the instances with a larger instance type and enable termination protection on them.",
      "Add subnets in at least one more Availability Zone to the Auto Scaling group and enable those Availability Zones on the Application Load Balancer.",
      "Deploy an independent copy of the application in a second AWS Region and serve both copies with Amazon Route 53 latency records."
    ],
    "correct": 2,
    "explanation":
      "Extending the Auto Scaling group and the load balancer across more Availability Zones is a configuration change that removes the zonal single point of failure while leaving one environment to operate. AMIs in another Region only shorten a manual rebuild after an outage. A larger instance stays in the failing zone, and termination protection does not prevent a host or zone failure. A second Region also removes the single point of failure, but it duplicates the whole environment and everything needed to operate it, which the requirement for the least overhead rules out."
  },
  {
    "id": 202,
    "domain": 2,
    "ts": "2.2",
    "q": "A production Amazon RDS for MySQL DB instance must stay reachable at the same endpoint if its Availability Zone becomes unavailable, and the switch must happen without any operator action. Which solution meets these requirements?",
    "options": [
      "Enable a Multi-AZ DB instance deployment for the DB instance.",
      "Create two read replicas of the DB instance in the same Availability Zone as the primary.",
      "Create a cross-Region read replica of the DB instance in a second AWS Region.",
      "Take a manual DB snapshot every hour and restore it into a second Availability Zone when needed."
    ],
    "correct": 0,
    "explanation":
      "In a Multi-AZ DB instance deployment, Amazon RDS fails over to the standby in the other Availability Zone by itself and points the DB instance endpoint at the new primary, so the application keeps using the same endpoint. Read replicas in the same Availability Zone share that zone's fate and require a manual promotion that changes the endpoint. A cross-Region read replica addresses Regional disaster recovery and is also promoted manually. Restoring hourly snapshots is a manual procedure that loses recent writes."
  },
  {
    "id": 203,
    "domain": 2,
    "ts": "2.1",
    "q": "An order processing service is being decoupled. Each customer's orders must be processed in the sequence in which that customer submitted them, and an order that a client submits twice in quick succession must not be processed twice. Which solution meets these requirements?",
    "options": [
      "Publish the orders to an Amazon SNS standard topic and subscribe the processing service to the topic.",
      "Send the orders to an Amazon SQS standard queue and have the consumer sort them by timestamp.",
      "Send the orders to an Amazon SQS FIFO queue and set a message group ID for each customer.",
      "Send the orders to an Amazon Data Firehose delivery stream that writes to the processing service."
    ],
    "correct": 2,
    "explanation":
      "An SQS FIFO queue preserves the order of the messages inside a message group and provides exactly-once processing by removing duplicates that are sent within the deduplication interval. With the customer as the message group ID, each customer's orders are delivered once and in the order that customer sent them, and orders from different customers can still be processed in parallel. An SNS standard topic fans notifications out and does not preserve order. An SQS standard queue delivers messages at least once and only makes a best effort to preserve order, so sorting in the consumer still leaves duplicates to deal with. Amazon Data Firehose buffers records and loads them into storage and analytics destinations; it is not a queue for transactional processing."
  },
  {
    "id": 204,
    "domain": 2,
    "ts": "2.2",
    "q": "A company must recover its workload in a second AWS Region with a recovery time objective of minutes and a recovery point objective close to zero, while keeping the ongoing cost below that of a full duplicate of production. Which solution meets these requirements?",
    "options": [
      "Store the nightly backups in the second Region with AWS Backup, and build the entire environment, including the database and the application tier, from them once a disaster has been declared.",
      "Replicate the database continuously to the second Region, and keep the whole application tier switched off in that Region until a disaster is declared and the application instances are all started.",
      "Run a continuously replicated database and a reduced-capacity but fully working application tier in the second Region, and scale the application tier up when a disaster is declared.",
      "Run the full production environment in both Regions, and serve user traffic from both of them at all times."
    ],
    "correct": 2,
    "explanation":
      "This is warm standby: every component already runs in the recovery Region, so recovery is a scaling operation that finishes in minutes, and continuous replication keeps the recovery point close to zero, while the reduced capacity keeps the cost below a full duplicate. Rebuilding from backups is backup and restore, which takes hours. Keeping the application tier switched off is pilot light: the data is current, but the servers must still be provisioned and started. Running full production in both Regions is multi-site active/active, which recovers fastest but costs the most."
  },
  {
    "id": 205,
    "domain": 2,
    "ts": "2.1",
    "q": "An Application Load Balancer distributes requests to an Auto Scaling group. Users lose their session whenever a request reaches a different instance, and the application cannot be modified. Which solution meets these requirements?",
    "options": [
      "Enable cross-zone load balancing on the Application Load Balancer so that requests are spread evenly across the Availability Zones.",
      "Enable sticky sessions on the target group by using a load balancer generated duration-based cookie.",
      "Replace the Application Load Balancer with a Network Load Balancer, which routes each connection using layer 4 flow hashing.",
      "Enable a deregistration delay on the target group, which by default waits 300 seconds before removing a draining target."
    ],
    "correct": 1,
    "explanation":
      "Duration-based stickiness makes the load balancer issue its own cookie and route every later request from that client to the same target for the configured duration, which preserves the in-memory session without touching the application. Cross-zone load balancing spreads requests more evenly across Availability Zones, which makes the symptom more frequent rather than less. A Network Load Balancer keeps a connection on one target through flow hashing, but it works at layer 4 and gives up the HTTP features the application relies on, so it is a much larger change for a worse fit. A deregistration delay only lets in-flight requests finish before a target is removed."
  },
  {
    "id": 206,
    "domain": 2,
    "ts": "2.1",
    "q": "Some messages in an Amazon SQS queue fail every time they are processed and are received again and again, which delays the rest of the queue. The team must set these messages aside for later analysis. Which solution meets these requirements?",
    "options": [
      "Increase the visibility timeout of the queue so that a failing message stays hidden for longer after each receive.",
      "Enable long polling by setting a receive message wait time on the queue so that a consumer waits for a message to arrive instead of returning an empty response immediately.",
      "Reduce the message retention period of the queue so that a message that cannot be processed is deleted sooner.",
      "Configure a redrive policy on the queue that moves a message to a dead-letter queue after a set maxReceiveCount."
    ],
    "correct": 3,
    "explanation":
      "A redrive policy moves a message to the dead-letter queue once it has been received more times than maxReceiveCount, which takes the failing messages out of the main queue and keeps them available for inspection. A longer visibility timeout only spaces the retries further apart. Long polling reduces empty ReceiveMessage responses and has no effect on processing failures. Shortening the retention period deletes the messages instead of preserving them."
  },
  {
    "id": 207,
    "domain": 2,
    "ts": "2.2",
    "q": "A global application needs a relational database that serves low-latency reads from several AWS Regions and that can be recovered in another Region after a Regional outage, with a recovery point objective measured in seconds and a recovery time objective measured in minutes. Which solution meets these requirements?",
    "options": [
      "Create an Aurora global database with the primary DB cluster in one Region and secondary DB clusters in the Regions that serve readers.",
      "Create an Aurora DB cluster in one Region with Aurora Replicas in three Availability Zones and point the remote readers at the cluster reader endpoint.",
      "Create an Amazon DynamoDB global table and add a DynamoDB Accelerator (DAX) cluster in each Region.",
      "Create an Aurora Serverless v2 DB cluster in a single Region and enable automated backups."
    ],
    "correct": 0,
    "explanation":
      "An Aurora global database takes writes in one Region and replicates them to as many as 10 read-only secondary Regions with a latency that is typically under a second, so readers get local latency, the recovery point stays in the seconds range, and promoting a secondary cluster restores writes in minutes. A single-Region cluster serves remote readers across long network paths and disappears entirely in a Regional outage. DynamoDB global tables do give multi-Region low latency, but DynamoDB is not a relational database. Aurora Serverless v2 changes how the cluster's capacity scales; on its own, in a single Region, it adds no cross-Region resilience."
  },
  {
    "id": 208,
    "domain": 2,
    "ts": "2.1",
    "q": "A Network Load Balancer forwards traffic to a target group whose instances are unevenly spread over two Availability Zones: a few instances in one zone and many in the other. The instances in the zone that has few targets run close to their limit while the instances in the other zone stay lightly loaded. Requests must be spread evenly over all of the registered targets. Which solution meets these requirements?",
    "options": [
      "Enable sticky sessions on the target group so that each client keeps reaching the same target.",
      "Turn on cross-zone load balancing for the Network Load Balancer.",
      "Associate an Elastic IP address with the load balancer network interface in each Availability Zone.",
      "Create Amazon Route 53 weighted records for the load balancer and weight them by the number of targets in each Availability Zone."
    ],
    "correct": 1,
    "explanation":
      "Cross-zone load balancing is disabled by default on a Network Load Balancer, so each load balancer node sends traffic only to the targets in its own Availability Zone while DNS splits client traffic roughly evenly between the nodes. With unequal target counts that produces exactly the imbalance described. Turning cross-zone load balancing on lets every node reach every registered target, so each target receives a comparable share. Sticky sessions pin a client to a target and make the imbalance worse rather than better. Elastic IP addresses change how clients address the load balancer nodes, not how a node picks a target. Weighted Route 53 records point at the load balancer as a whole and cannot steer traffic to individual load balancer nodes."
  },
  {
    "id": 209,
    "domain": 2,
    "ts": "2.1",
    "q": "An Amazon SNS topic notifies several downstream systems. One subscriber, an AWS Lambda function, sometimes fails, and those notifications are never processed. Which combination of steps should a solutions architect take to make delivery to that subscriber reliable? (Select TWO.)",
    "multi": true,
    "options": [
      "Configure a dead-letter queue on the Amazon SQS queue with a redrive policy so that messages the function repeatedly fails to process are retained.",
      "Convert the Amazon SNS topic to a FIFO topic, enable content-based deduplication, and have the function acknowledge each notification in order.",
      "Subscribe an Amazon SQS queue to the topic and have the Lambda function consume that queue.",
      "Increase the amount of memory allocated to the AWS Lambda function so that it has proportionally more CPU and times out less often.",
      "Shorten the DNS time to live of the subscriber endpoint so that Amazon SNS resolves a new address sooner after a failure."
    ],
    "correct": [0, 2],
    "explanation":
      "Putting an SQS queue between the topic and the function gives the notifications a durable buffer that the function retries against at its own pace, and a redrive policy on that queue moves a message to a dead-letter queue once it has exceeded the maximum receive count, so a message the function keeps failing on is kept for inspection instead of being lost. A FIFO topic changes ordering and deduplication semantics and does nothing about a failing subscriber. More memory can make an invocation faster but does not make delivery durable. The DNS time to live of an endpoint has no bearing on Amazon SNS delivery."
  },
  {
    "id": 210,
    "domain": 2,
    "ts": "2.2",
    "q": "A Linux application writes to a shared file system from instances in three Availability Zones. The file system must stay available to the remaining instances if one Availability Zone becomes unavailable. Which solution meets these requirements?",
    "options": [
      "Create an Amazon EFS One Zone file system and create a mount target in the Availability Zone that holds the most instances.",
      "Create a Regional Amazon EFS file system and create a mount target in each Availability Zone.",
      "Create an Amazon EBS io2 volume that has Multi-Attach enabled and attach it to the instances in all three Availability Zones.",
      "Attach an instance store volume to each instance and replicate the files between the instances with a background job."
    ],
    "correct": 1,
    "explanation":
      "A Regional EFS file system stores data redundantly across several Availability Zones, and a mount target in each zone lets the instances there keep reading and writing when another zone is unavailable. An EFS One Zone file system keeps the data in a single Availability Zone, so it goes down with that zone. EBS Multi-Attach requires every attached instance to be in the same Availability Zone as the volume, so it cannot reach three zones. Instance store volumes are ephemeral local disks, and a replication job between them is neither consistent nor durable."
  },
  {
    "id": 211,
    "domain": 2,
    "ts": "2.2",
    "q": "A company must be able to recover the previous content of an object in an Amazon S3 bucket after an application overwrites the object or deletes it by mistake. Which solution meets these requirements?",
    "options": [
      "Enable S3 Transfer Acceleration on the bucket.",
      "Enable S3 Versioning on the bucket.",
      "Enable S3 Intelligent-Tiering on the bucket.",
      "Create an S3 Lifecycle rule that expires objects after 30 days."
    ],
    "correct": 1,
    "explanation":
      "With versioning enabled, an overwrite creates a new version and keeps the previous one, and a delete adds a delete marker instead of removing data, so any earlier version can be restored. Transfer Acceleration routes uploads through edge locations to make them faster. Intelligent-Tiering moves objects between access tiers to reduce cost. A lifecycle expiration rule deletes objects, which makes data loss more likely rather than less."
  },
  {
    "id": 212,
    "domain": 2,
    "ts": "2.2",
    "q": "A company stores content for a Linux application on an Amazon EFS file system in one AWS Region. A new business continuity policy requires that the file system contents be maintained in a second Region so that the application can be restarted there after a Regional outage, with a recovery point objective of 15 minutes. The company does not want to build or operate a copy process. Which solution meets these requirements with the LEAST operational overhead?",
    "options": [
      "Create an AWS DataSync task that runs every 15 minutes and transfers the file system contents to an EFS file system in the second Region.",
      "Enable EFS replication to a destination file system in the second Region.",
      "Enable EFS Infrequent Access lifecycle management and copy the file system backups to the second Region.",
      "Mount the file system on an Amazon EC2 instance in the second Region over an AWS Site-to-Site VPN connection."
    ],
    "correct": 1,
    "explanation":
      "EFS replication is a managed feature that keeps a read-only replica of a file system in another AWS Region and is designed for a recovery point objective of 15 minutes for most file systems, with nothing for the company to schedule or operate. A DataSync task on a schedule works but adds a task to configure, monitor and pay for, so it carries more operational overhead. EFS Infrequent Access is a storage class that moves cold files to cheaper storage inside the same file system; it does not copy anything to another Region. Mounting the file system across Regions over a VPN leaves a single file system in the original Region, so a Regional outage still takes the data offline."
  },
  {
    "id": 213,
    "domain": 2,
    "ts": "2.1",
    "q": "An Auto Scaling group must add and remove instances so that average CPU utilization across the group stays close to 50%, without an administrator defining upper and lower thresholds. Which solution meets these requirements?",
    "options": [
      "Configure a step scaling policy on an Amazon CloudWatch alarm for the average CPU utilization of the group, with an upper and a lower threshold.",
      "Configure a target tracking scaling policy that uses the ASGAverageCPUUtilization predefined metric with a target value of 50.",
      "Configure predictive scaling on the Auto Scaling group, and let it forecast capacity from historical utilization patterns recorded over prior weeks.",
      "Configure a scheduled scaling action that sets the desired capacity of the group every hour, based on the average utilization observed on prior days."
    ],
    "correct": 1,
    "explanation":
      "A target tracking policy takes a target value for a metric and manages the CloudWatch alarms and the capacity changes needed to hold it, which is exactly what the requirement describes. A step scaling policy needs the alarms and the adjustment steps to be defined by hand. Predictive scaling forecasts capacity from historical patterns and sets it ahead of the load rather than tracking a utilization target. Scheduled scaling follows the clock, not utilization."
  },
  {
    "id": 214,
    "domain": 2,
    "ts": "2.1",
    "q": "Clients retry API requests when a response is slow, and those retries sometimes charge the same payment twice. Which approach will meet the requirement that a repeated request has no additional effect?",
    "options": [
      "Increase the number of instances in the Auto Scaling group behind the API so that responses are returned before a client retries, using a target tracking scaling policy.",
      "Enable sticky sessions on the target group of the load balancer so that a retry reaches the same target as the original request, using a load balancer generated cookie.",
      "Place an Amazon SQS FIFO queue in front of the API, and have clients write to the queue so that duplicate messages are removed before the service sees them.",
      "Require clients to send a unique idempotency key with each request, and have the service return the stored result when it sees a key again."
    ],
    "correct": 3,
    "explanation":
      "Storing the result against a client-supplied idempotency key lets the service recognize a retry and return the original outcome instead of charging again, which makes the operation idempotent however often it is retried. More instances change capacity, not semantics. Sticky sessions keep a client on one target, but the duplicate request is still processed there. A FIFO queue removes only duplicates sent within its deduplication interval, so a client that retries later, or with a slightly different body, still produces a second charge."
  },
  {
    "id": 215,
    "domain": 2,
    "ts": "2.1",
    "q": "A data processing job has several steps. Each step needs its own retry behavior and error handling, and some steps run only when an earlier step produces a particular result. The company does not want this logic written into the application code. Which solution meets these requirements?",
    "options": [
      "Define the job as an AWS Step Functions state machine that invokes each step, using Retry and Catch fields and Choice states.",
      "Send each step's work to an Amazon SQS queue and let each consumer decide what to run next.",
      "Publish an Amazon SNS message at the end of each step and subscribe the next step to the topic.",
      "Run each step as a separate AWS Batch job and order the jobs with job dependencies."
    ],
    "correct": 0,
    "explanation":
      "A Step Functions state machine expresses the sequence, the per-step Retry and Catch behavior, and the conditional branches as configuration rather than code, and it records the state of every execution. Chaining SQS queues pushes the orchestration back into each consumer. SNS notifications between steps provide no retry policy, no branching, and no view of the workflow. AWS Batch job dependencies order jobs but give no per-step catch handlers or conditional paths."
  },
  {
    "id": 216,
    "domain": 2,
    "ts": "2.1",
    "q": "A company must load balance TCP traffic at very high throughput and very low latency, and the backend instances must see the original client IP address. Which solution meets these requirements?",
    "options": [
      "Use an Application Load Balancer and read the client IP address from the X-Forwarded-For header.",
      "Use a Gateway Load Balancer with the backend instances registered as targets.",
      "Use a Classic Load Balancer with a TCP listener.",
      "Use a Network Load Balancer with a target group of the instance target type."
    ],
    "correct": 3,
    "explanation":
      "A Network Load Balancer works at layer 4, handles millions of requests per second, and with instance target type it preserves the client IP address, so the backends see the original source. An Application Load Balancer works at layer 7 and terminates HTTP, so it does not carry arbitrary TCP traffic, and X-Forwarded-For exists only for HTTP. A Gateway Load Balancer is designed to send traffic through a fleet of virtual appliances such as firewalls, not to balance an application's own TCP traffic. The Classic Load Balancer is the previous generation of Elastic Load Balancing, and AWS recommends migrating to a current generation load balancer."
  },
  {
    "id": 217,
    "domain": 2,
    "ts": "2.2",
    "q": "A company must define retention rules and cross-Region copies for the backups of Amazon EBS volumes, Amazon RDS databases, Amazon DynamoDB tables, and Amazon EFS file systems from a single place. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Create an Amazon EventBridge scheduled rule for each one of the services that invokes an AWS Lambda function to take the backups and to copy each one of them to a second Region.",
      "Enable the automated backup feature of each service, and copy the resulting backups to a second Region with a script that runs on a schedule on an Amazon EC2 instance.",
      "Create an AWS Backup plan whose rules set the retention period and copy each recovery point to a vault in a second Region, and assign the resources to the plan.",
      "Create an Amazon Data Lifecycle Manager policy for each one of the four services."
    ],
    "correct": 2,
    "explanation":
      "A backup plan in AWS Backup applies the same schedule, retention, and cross-Region copy rules to resources from all of these services, and resource assignments can select them by tag, so there is one place to manage and audit backups. EventBridge rules with Lambda functions mean writing and maintaining the backup logic per service. Per-service automated backups have different retention models and no shared cross-Region copy. Amazon Data Lifecycle Manager automates EBS snapshots and EBS-backed AMIs only, so it does not cover Amazon RDS, DynamoDB, or Amazon EFS."
  },
  {
    "id": 218,
    "domain": 2,
    "ts": "2.1",
    "q": "An Amazon RDS for MySQL Multi-AZ DB instance deployment is slow because reporting queries generate far more read traffic than the application's writes. The reports must stop affecting the write workload. Which solution meets these requirements?",
    "options": [
      "Increase the backup retention period of the DB instance.",
      "Point the reporting queries at the standby of the Multi-AZ DB instance deployment.",
      "Create one or more read replicas of the DB instance and point the reporting queries at them.",
      "Change the storage type of the DB instance to magnetic storage."
    ],
    "correct": 2,
    "explanation":
      "Read replicas receive an asynchronous copy of the primary database and accept read traffic, so the reports run on a replica and the primary is left to serve writes; more replicas can be added as the reporting load grows. The standby of a Multi-AZ DB instance deployment exists for failover and does not serve read traffic, so it cannot be queried. A Multi-AZ DB cluster deployment is a different deployment type, with two standby instances that can serve reads. A longer backup retention period changes recovery options, not performance, and magnetic storage is the slowest RDS storage type."
  },
  {
    "id": 219,
    "domain": 2,
    "ts": "2.2",
    "q": "A company must keep its disaster recovery cost as low as possible by storing only backups in the second AWS Region, with no infrastructure running there, and it accepts a recovery time objective of several hours. Which statement about this strategy is correct?",
    "options": [
      "It is backup and restore: it has the lowest ongoing cost of the disaster recovery strategies and the longest recovery time and recovery point objectives.",
      "It is pilot light: the data layer is replicated continuously and only the application tier is switched off.",
      "It is warm standby: a reduced-capacity copy of the whole workload runs continuously in the second Region.",
      "It is multi-site active/active: recovery is almost instantaneous and the ongoing cost is the lowest of all the strategies."
    ],
    "correct": 0,
    "explanation":
      "Storing backups and building the environment only after a disaster is declared is backup and restore, the cheapest strategy to run and the slowest to recover from, which matches a recovery time objective of hours. Pilot light replicates the data layer continuously, which the description explicitly rules out. Warm standby runs a scaled-down copy of the whole workload at all times. Multi-site active/active recovers the fastest but is the most expensive strategy, so the cost half of that statement is wrong."
  },
  {
    "id": 220,
    "domain": 2,
    "ts": "2.1",
    "q": "A company must route events from AWS services, from third-party SaaS applications, and from its own applications to different targets according to the content of each event, without managing any servers. Which solution meets these requirements?",
    "options": [
      "Create an Amazon SQS queue for each target and have the producers write each event to the right queue.",
      "Create an Amazon MQ broker and have the producers publish each event to a topic on the broker.",
      "Create an Amazon Kinesis data stream and have each target read the stream and filter the records it needs.",
      "Create an Amazon EventBridge event bus with rules whose event patterns match the events each target should receive."
    ],
    "correct": 3,
    "explanation":
      "EventBridge receives events from AWS services, SaaS partner sources, and custom applications on an event bus, and its rules match event patterns to decide which targets receive which events, with no infrastructure to run. Having each producer choose an SQS queue per target moves the routing decision into every producer. Amazon MQ is a managed broker for applications that already speak protocols such as JMS or AMQP, and its brokers must be sized and maintained. A Kinesis data stream delivers the whole stream to each consumer, which then discards the records it does not want."
  },
  {
    "id": 221,
    "domain": 2,
    "ts": "2.2",
    "q": "A web application runs on Amazon EC2 instances registered with an Application Load Balancer in three Availability Zones. During an event that impairs one Availability Zone, the instances there stay healthy but answer requests with errors, so the load balancer keeps sending traffic to them. The operations team must move traffic away from that one Availability Zone with a single action and move it back afterwards, without modifying the application or deregistering targets. Which solution meets these requirements?",
    "options": [
      "Start a zonal shift in Amazon Application Recovery Controller (ARC) for the load balancer and specify the impaired Availability Zone.",
      "Remove the subnet of the impaired Availability Zone from the load balancer and add it back after the event.",
      "Set the desired capacity of the Auto Scaling group to zero and let it launch replacement instances in the other Availability Zones.",
      "Create an Amazon Route 53 failover record for the load balancer with a health check that targets the impaired Availability Zone."
    ],
    "correct": 0,
    "explanation":
      "A zonal shift in ARC moves a load balancer resource away from one impaired Availability Zone in a single action, and the shift is reversible when the zone recovers. It is designed for exactly this case, where the zone is degraded but the targets still pass their health checks. Editing the load balancer's subnets is a configuration change on the load balancer, and it has to be reverted by hand afterwards. Setting the desired capacity to zero takes the whole application down before it rebuilds it. A Route 53 failover record works between two endpoints, not between the Availability Zones behind one load balancer whose DNS name resolves to all of its zonal nodes."
  },
  {
    "id": 222,
    "domain": 2,
    "ts": "2.2",
    "q": "Instances launched by an Auto Scaling group need about 8 minutes to finish bootstrapping before they can answer the load balancer health check. The Auto Scaling group marks them unhealthy and replaces them before they finish starting. Which solution meets the requirement that new instances are given time to start?",
    "options": [
      "Set the cooldown period of the Auto Scaling group to a value of 0 seconds, and leave the health check grace period unchanged.",
      "Change the health check type of the Auto Scaling group from ELB to EC2 so that only the instance status checks are considered.",
      "Set the health check grace period of the Auto Scaling group to a value longer than the bootstrap time.",
      "Increase the desired capacity of the Auto Scaling group up to its maximum value, launching more instances than are needed."
    ],
    "correct": 2,
    "explanation":
      "The health check grace period is the minimum time a new instance stays in service before Amazon EC2 Auto Scaling will terminate it for being unhealthy, so setting it above the bootstrap time stops the premature replacements. When a group is created in the console the grace period defaults to 300 seconds, which is shorter than this application needs. The cooldown period spaces out scaling activities and does not affect health evaluation. Switching to EC2 health checks hides the problem by ignoring the load balancer's view of the application. Raising the desired capacity launches more instances that are replaced the same way."
  },
  {
    "id": 223,
    "domain": 2,
    "ts": "2.2",
    "q": "A company is designing a multi-Region active/active architecture so that a global web application serves users from the closest AWS Region and survives the loss of a Region. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Deploy the application into a single Availability Zone in each Region to keep the Regions symmetrical.",
      "Create Amazon Route 53 latency records for the Regional endpoints so that each user is sent to the Region that answers fastest.",
      "Replicate the database by copying a cross-Region snapshot every night.",
      "Use Amazon DynamoDB global tables so that writes accepted in either Region are replicated to the other.",
      "Serve all write traffic from one Region and keep the other Region read-only until a failover is declared."
    ],
    "correct": [1, 3],
    "explanation":
      "Latency records send each user to whichever Regional endpoint answers fastest for that user, which is what makes the deployment active in more than one Region, and a multi-Region database keeps the data in step between the Regions that serve that traffic. Restricting each Region to one Availability Zone puts a zonal single point of failure back inside every Region. A nightly snapshot copy leaves the second Region a day behind, which no active deployment can serve from. Serving writes from one Region and failing over is an active-passive design, not active/active."
  },
  {
    "id": 224,
    "domain": 2,
    "ts": "2.2",
    "q": "A company wants a disaster recovery design in which the database is replicated continuously into a second AWS Region while the application servers there stay switched off and are started only when a disaster is declared. Which disaster recovery strategy describes this design?",
    "options": [
      "Backup and restore.",
      "Pilot light.",
      "Warm standby.",
      "Multi-site active/active."
    ],
    "correct": 1,
    "explanation":
      "Pilot light keeps the core of the workload, usually the replicated data layer, alive in the recovery Region while the compute is provisioned or started only at failover, which is exactly the design described. Backup and restore keeps no live replication at all. Warm standby already runs the application tier at reduced capacity, so nothing has to be started from scratch. Multi-site active/active runs the full stack in both Regions and serves traffic from both."
  },
  {
    "id": 225,
    "domain": 2,
    "ts": "2.1",
    "q": "A video processing fleet in an Auto Scaling group consumes an Amazon SQS queue. When a burst of requests arrives, the queue grows for a long time before workers are added, and the workers keep running after the queue drains. Which solution meets the requirement that the size of the fleet follows the queue?",
    "options": [
      "Add a scheduled scaling action that covers the hours during which the bursts usually occur.",
      "Enable the default instance warmup on the Auto Scaling group, and keep the existing CPU-based scaling policy so that a worker that is still starting does not skew the metric.",
      "Set the visibility timeout of the queue so that it matches the time a worker typically needs to finish processing one message before it becomes visible again to other consumers.",
      "Publish a custom backlog-per-instance metric from the queue's ApproximateNumberOfMessagesVisible value and create a target tracking policy on that metric."
    ],
    "correct": 3,
    "explanation":
      "Scaling on the number of waiting messages per running instance ties capacity directly to the outstanding work, so the group grows while the backlog builds and shrinks as it clears. Scheduled scaling only helps if the bursts follow the clock, which the scenario does not state. The default instance warmup stops a starting instance from skewing the metrics, but a CPU-based policy still reacts to worker load rather than to the queue. The visibility timeout controls how long a received message stays hidden, which changes redelivery behavior, not capacity."
  },
  {
    "id": 226,
    "domain": 2,
    "ts": "2.1",
    "q": "Consumers of an Amazon SQS standard queue need about 4 minutes to process a message, and the queue uses the default visibility timeout. The same message is frequently processed by more than one consumer at the same time. Which solution meets the requirement that a message is processed once per receive?",
    "options": [
      "Increase the visibility timeout of the queue so that it is longer than the time a consumer needs to process and delete a message.",
      "Enable long polling by setting a receive message wait time on the queue so that a consumer waits for a message to arrive before it returns.",
      "Reduce the number of consumers to one so that no other consumer can receive the message while it is being processed.",
      "Replace the queue with an Amazon SNS topic that the consumers subscribe to, so that each consumer receives its own copy of every message that is published."
    ],
    "correct": 0,
    "explanation":
      "The default visibility timeout of an SQS queue is 30 seconds, so a message that is still being processed becomes visible again long before the consumer finishes and another consumer receives it; setting the timeout above the processing time prevents that, and a consumer can also call ChangeMessageVisibility to extend the timeout for a long-running message. Long polling reduces empty ReceiveMessage responses and does not change when a message reappears. Running a single consumer removes the parallelism the fleet exists for and still hits the same timeout. An SNS topic delivers a copy of each message to every subscriber, which is the opposite of the goal."
  },
  {
    "id": 227,
    "domain": 2,
    "ts": "2.1",
    "q": "An AWS Lambda function is invoked from an Amazon SQS queue and calls a third-party payment API. The contract with the provider caps the number of requests the company may have in flight at any moment. During traffic bursts the function scales out past that cap and the provider rejects the extra requests. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Configure reserved concurrency on the Lambda function at the number of in-flight requests the contract allows.",
      "Configure provisioned concurrency on the Lambda function so that pre-initialized execution environments absorb the bursts.",
      "Increase the amount of memory allocated to the Lambda function so that each invocation completes faster.",
      "Increase the batch size of the Amazon SQS event source mapping so that each invocation processes more messages."
    ],
    "correct": 0,
    "explanation":
      "Reserved concurrency sets both the minimum and the maximum number of concurrent instances of a function, and AWS documents it as the control for limiting concurrency so that a function does not overwhelm a downstream resource. Setting it to the contractual limit caps the requests in flight, costs nothing extra, and requires no application change; messages simply wait in the queue. Provisioned concurrency pre-initializes execution environments to cut cold start latency and does not put a ceiling on how far the function scales. More memory makes each invocation faster but leaves the function free to scale out past the cap. A larger batch size changes how many messages each invocation handles, not how many invocations run at the same time."
  },
  {
    "id": 228,
    "domain": 2,
    "ts": "2.1",
    "q": "A globally distributed application must let users in Europe, Asia, and North America read and write the same NoSQL data set locally, with the data replicated automatically between the Regions. Which solution meets these requirements?",
    "options": [
      "Create an Amazon DynamoDB table in one Region and add a DynamoDB Accelerator (DAX) cluster in front of it.",
      "Create an Amazon RDS for MySQL DB instance in one Region and add a cross-Region read replica in each other Region.",
      "Create an Amazon DynamoDB global table with a replica in each of the three Regions.",
      "Create an Amazon ElastiCache for Redis cluster in each Region and write to the cluster closest to the user."
    ],
    "correct": 2,
    "explanation":
      "A DynamoDB global table keeps a replica of the table in each selected Region, and every replica accepts reads and writes and propagates them to the others, which is what local read and write access across Regions requires. A single table with a DAX cluster speeds up reads in one Region and leaves the other users with cross-Region latency. Cross-Region read replicas of an RDS DB instance accept reads only, so writes still travel to the primary Region. ElastiCache clusters in different Regions are independent caches, not a replicated system of record."
  },
  {
    "id": 229,
    "domain": 2,
    "ts": "2.2",
    "q": "A company wants users to be served a static maintenance page that is hosted in Amazon S3 behind Amazon CloudFront whenever the primary application behind an Application Load Balancer fails its health check. Which solution meets these requirements?",
    "options": [
      "Create Amazon Route 53 failover records: a primary record for the Application Load Balancer with an associated health check, and a secondary record for the CloudFront distribution.",
      "Create Amazon Route 53 weighted records that send 50 percent of the user traffic to the Application Load Balancer and the other 50 percent to the CloudFront distribution at all times of the day.",
      "Create Amazon Route 53 latency records for both the Application Load Balancer and the CloudFront distribution, so each query resolves to whichever endpoint reports the lower round-trip latency.",
      "Create Amazon Route 53 geolocation records that name the CloudFront distribution as the default record."
    ],
    "correct": 0,
    "explanation":
      "Failover routing answers with the primary record while its health check passes and switches to the secondary record when the health check fails, so users reach the maintenance page only during an outage. Weighted records would send half of all users to the maintenance page while the application is perfectly healthy. Latency records pick the endpoint that answers fastest, which says nothing about whether the application is working. Geolocation records choose by the location of the query, and the default record answers queries that match no location, not queries made during an outage."
  },
  {
    "id": 230,
    "domain": 2,
    "ts": "2.2",
    "q": "A company runs a self-managed Apache Cassandra cluster of several dozen Amazon EC2 instances. The cluster keeps several replicas of every row on different nodes. A recent failure of one piece of underlying hardware took down nodes that held replicas of the same rows, and the cluster lost part of its data availability. A solutions architect must place the nodes so that a failure of the underlying hardware can affect the nodes of only one replica group. Which solution meets these requirements?",
    "options": [
      "Launch every node in a cluster placement group so that the nodes are packed close together.",
      "Launch the nodes in a partition placement group and put each replica group in its own partition.",
      "Launch every node on a Dedicated Host and enable termination protection on the instances.",
      "Launch every node in a spread placement group so that each node sits on distinct underlying hardware."
    ],
    "correct": 1,
    "explanation":
      "A partition placement group spreads instances across logical partitions so that the instances in one partition do not share underlying hardware with the instances in another partition, and AWS names large distributed and replicated workloads such as Cassandra as its typical use. Aligning replica groups with partitions means one hardware failure can only take out one replica of any row. A cluster placement group does the opposite: it packs instances together for low-latency networking, which concentrates the failure domain. A spread placement group also isolates hardware, but it is meant for a small group of instances and is capped at a low number of instances per Availability Zone, so it cannot hold a cluster of several dozen nodes. Dedicated Hosts control tenancy and billing, not the spread of instances over distinct hardware, and termination protection has no effect on a hardware failure."
  },
  {
    "id": 231,
    "domain": 2,
    "ts": "2.2",
    "q": "A legacy application runs on one Amazon EC2 instance and cannot run on more than one instance at a time. If the underlying host fails, the instance must be brought back automatically, without an operator rebuilding it. Which solution meets these requirements?",
    "options": [
      "Create an Amazon CloudWatch alarm on the StatusCheckFailed_System metric of the instance with the EC2 recover action.",
      "Put the instance in an Auto Scaling group with a minimum and a maximum capacity of two.",
      "Create an Amazon Machine Image (AMI) of the instance every night and launch a new instance from the AMI after a failure.",
      "Create an Amazon Data Lifecycle Manager policy that snapshots the instance's EBS volumes every hour."
    ],
    "correct": 0,
    "explanation":
      "A failed system status check means the problem is in the AWS infrastructure the instance runs on, and the recover action makes Amazon EC2 migrate the instance to different hardware automatically, keeping its instance ID, private IP addresses, and Elastic IP addresses. An Auto Scaling group of two instances requires an application that can run on several nodes at once, which this one cannot. Nightly AMIs and hourly snapshots shorten a manual rebuild, but neither of them starts by itself, so recovery still waits for an operator."
  },
  {
    "id": 232,
    "domain": 2,
    "ts": "2.1",
    "q": "When an Auto Scaling group scales in, instances are terminated before a script can copy their local log files to Amazon S3. The logs must be copied before each instance is terminated. Which solution meets these requirements?",
    "options": [
      "Increase the cooldown period of the Auto Scaling group so that the group waits longer between scaling activities before it terminates an instance.",
      "Add a termination lifecycle hook to the Auto Scaling group, run the upload while the instance is in the Terminating:Wait state, and call CompleteLifecycleAction when the upload finishes.",
      "Suspend the Terminate process of the Auto Scaling group, and have a scheduled job resume the process once it has confirmed that the log files of the instances that are marked for termination are already in Amazon S3.",
      "Schedule the upload script to run every 12 hours on each instance through a cron job, and accept the loss of the log lines that are written after the last successful run."
    ],
    "correct": 1,
    "explanation":
      "A termination lifecycle hook pauses the instance in a wait state and emits an event, so a Lambda function or an agent on the instance can upload the logs and then release the instance with CompleteLifecycleAction; the hook allows a bounded amount of time, one hour by default. A longer cooldown spaces out scaling activities but does not delay a termination that has already begun. Suspending the Terminate process stops scale-in altogether and leaves instances running and billed. A script that runs every 12 hours leaves up to 12 hours of logs on the terminated instance."
  },
  {
    "id": 233,
    "domain": 2,
    "ts": "2.2",
    "q": "A company must be able to recover 50 on-premises virtual machines into AWS with a recovery point objective measured in seconds and a recovery time objective measured in minutes, without paying for full-size compute in AWS until a failover happens. Which solution meets these requirements?",
    "options": [
      "Use AWS Elastic Disaster Recovery to replicate the servers continuously into a low-cost staging area subnet and launch recovery instances only for drills and failovers.",
      "Use AWS Backup to take a daily backup of each one of the 50 virtual machines, and restore all of those backups into the recovery Region once a disaster has been declared by the team.",
      "Create an Amazon Machine Image from each on-premises virtual machine every week, copy those images into the recovery Region, and launch replacement instances from the latest one after a failover.",
      "Configure S3 Cross-Region Replication for each of the file shares that the virtual machines use."
    ],
    "correct": 0,
    "explanation":
      "Elastic Disaster Recovery replicates each source server continuously into a staging area subnet that uses low-cost storage and minimal compute, so the recovery point stays close to the last data written, and recovery instances are launched only for a drill or a real failover, which takes minutes. Daily backups put the recovery point up to a day behind, and weekly images are worse still. S3 Cross-Region Replication copies objects between buckets; it does not replicate whole servers or their operating systems."
  },
  {
    "id": 234,
    "domain": 2,
    "ts": "2.1",
    "q": "A company backs up its data center servers with a commercial backup application that writes to a physical tape library. The company wants to retire the tape hardware while keeping the same backup application and its existing tape workflows, and it wants the backups to end up in low-cost AWS archive storage. Which solution meets these requirements?",
    "options": [
      "Install the AWS CLI on the backup server, and run a scheduled script that copies the backup files that the commercial backup application produces to an Amazon S3 bucket that uses the S3 Glacier Deep Archive storage class.",
      "Deploy an Amazon S3 File Gateway on premises, and configure the backup application to write its backup files to an SMB file share exposed by that gateway, which caches the share locally and uploads new data to an S3 bucket as objects.",
      "Deploy an AWS Storage Gateway Volume Gateway in cached mode, and present its iSCSI volumes to the backup application as disk targets.",
      "Deploy an AWS Storage Gateway Tape Gateway on premises, present its virtual tape library to the backup application as iSCSI tape drives and a media changer, and let ejected tapes be archived in S3 Glacier Deep Archive."
    ],
    "correct": 3,
    "explanation":
      "A Tape Gateway exposes a virtual tape library whose tape drives and media changer appear to the backup application as iSCSI devices, so the existing tape-based backup software and its workflows keep working unchanged. Tapes the backup software ejects move to the archive, which is backed by S3 Glacier Flexible Retrieval or S3 Glacier Deep Archive. A script that copies files to Amazon S3 abandons the backup application's tape workflow and adds custom code to maintain. An S3 File Gateway and a Volume Gateway both store data in AWS, but they present a file share and iSCSI disk volumes, so the backup application has to be reconfigured for a different medium rather than continuing to see a tape library."
  },
  {
    "id": 235,
    "domain": 2,
    "ts": "2.1",
    "q": "A company has 40 VPCs in several AWS accounts and an on-premises data center that is connected through AWS Direct Connect. The full mesh of VPC peering connections between the VPCs has become unmanageable. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Create an AWS Transit Gateway, attach the VPCs to it, and associate it with a Direct Connect gateway.",
      "Create additional VPC peering connections and use one VPC as a transit VPC that routes between the others.",
      "Create an AWS PrivateLink endpoint service in each VPC and an interface VPC endpoint for it in every other VPC.",
      "Create an AWS Site-to-Site VPN connection between every pair of VPCs."
    ],
    "correct": 0,
    "explanation":
      "A transit gateway is a Regional hub: each VPC and the Direct Connect gateway attach to it once, routing is expressed in transit gateway route tables, and the gateway can be shared with other accounts through AWS Resource Access Manager, so adding a VPC is one attachment instead of dozens of peerings. A transit VPC does not work with peering, because VPC peering is not transitive and traffic cannot flow through an intermediate peered VPC. PrivateLink exposes an individual service endpoint rather than routing between networks, and one endpoint per pair recreates the mesh. Pairwise VPN connections rebuild the same mesh out of tunnels."
  },
  {
    "id": 236,
    "domain": 2,
    "ts": "2.2",
    "q": "A session cache runs on a single-node Amazon ElastiCache for Redis cluster. If the node fails, every cached session is lost and the application is degraded until a replacement node is provisioned. Which solution meets the requirement that the cache survives a node failure with an automatic failover?",
    "options": [
      "Take a daily backup of the cluster, and restore that backup to a newly launched replacement node manually after each node failure occurs.",
      "Change the cluster to a larger node type that has more memory.",
      "Convert the cluster to a replication group that has at least one replica in another Availability Zone, and enable Multi-AZ.",
      "Create a second, independent cluster in another Availability Zone, and have the application write every session to both of those clusters."
    ],
    "correct": 2,
    "explanation":
      "With Multi-AZ enabled on a replication group, ElastiCache detects the loss of the primary, promotes the replica that has the least replication lag, and propagates the DNS name of the new primary, so writes resume typically within a few seconds and the cached data survives. A daily backup loses a day of sessions and takes time to restore. A larger node has exactly the same single point of failure. Writing to two independent clusters moves the replication and failover logic into the application, which is what the managed replication group already provides."
  },
  {
    "id": 237,
    "domain": 2,
    "ts": "2.2",
    "q": "A company reaches AWS over a single AWS Direct Connect connection. It needs a backup path that carries the traffic if that connection fails, at the lowest possible ongoing cost. Which solution meets these requirements?",
    "options": [
      "Make no change at all, because a Direct Connect connection is already redundant, since it is a dedicated circuit rather than an internet path.",
      "Order a second Direct Connect connection that terminates on a different router inside the same Direct Connect location as the existing one.",
      "Enable S3 Transfer Acceleration for the part of the traffic that goes to Amazon S3, using the distinct Transfer Acceleration endpoint for the bucket.",
      "Configure an AWS Site-to-Site VPN connection over the internet to the same gateway and let BGP prefer the Direct Connect path."
    ],
    "correct": 3,
    "explanation":
      "A Site-to-Site VPN uses the existing internet connection and costs far less than a second dedicated circuit; with both attached to the same gateway, BGP prefers the Direct Connect path and moves traffic to the VPN when that path is withdrawn. A single Direct Connect connection is one circuit into one location and is not redundant on its own. A second connection in the same location protects against a device failure but not against an outage of that location, and it is the most expensive option. Transfer Acceleration speeds uploads to Amazon S3 over the internet and provides no path for the rest of the traffic."
  },
  {
    "id": 238,
    "domain": 2,
    "ts": "2.2",
    "q": "A company must protect the objects in a critical Amazon S3 bucket against permanent deletion by an attacker who has obtained the access keys of an application user. Recovery of any deleted object must remain possible, and no single compromised identity may be able to destroy the stored versions. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Enable S3 Versioning on the bucket.",
      "Change the storage class of the objects in the bucket to S3 One Zone-IA so that the cost of storing the retained object versions is lower.",
      "Add a bucket policy that denies s3:DeleteObjectVersion and s3:PutBucketVersioning to every principal except a dedicated break-glass IAM role.",
      "Enable S3 Transfer Acceleration on the bucket so that requests are routed through an edge location instead of directly to the bucket.",
      "Enable S3 server access logging for the bucket so that every delete request is recorded with the identity that issued it."
    ],
    "correct": [0, 2],
    "explanation":
      "With versioning enabled, a delete request adds a delete marker instead of removing data, so the earlier object versions remain available to restore. Denying s3:DeleteObjectVersion and s3:PutBucketVersioning in the bucket policy to every principal except a separately controlled break-glass role means the stolen keys cannot destroy those versions or switch versioning off, because a bucket policy is evaluated on every request regardless of what the identity policy allows. S3 One Zone-IA keeps the data in a single Availability Zone and reduces durability. Transfer Acceleration is about upload speed. Server access logging records who did what, which helps an investigation after the fact but does not stop the deletion."
  },
  {
    "id": 239,
    "domain": 2,
    "ts": "2.1",
    "q": "A company runs a loan approval process in which several AWS Lambda functions are chained together by custom code. One step must pause until a human reviewer approves the request, which can take several days, and the operations team must be able to see which step each request is currently on. The current implementation stores workflow state in a database and reimplements retries and error handling in every function. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Run the process as an AWS Step Functions Express Workflow and record the reviewer's decision in an Amazon DynamoDB table.",
      "Publish each step to an Amazon SNS topic and let the reviewer approve the request by replying to an email subscription.",
      "Run the process as an AWS Step Functions Standard Workflow and use the callback pattern with a task token for the approval step.",
      "Create an Amazon EventBridge rule that invokes the Lambda functions in sequence and polls the database for the reviewer's decision."
    ],
    "correct": 2,
    "explanation":
      "Standard Workflows run for up to one year, follow an exactly-once model, and are the only workflow type that supports the callback (.waitForTaskToken) integration pattern, which pauses a state until an external actor returns the token. Step Functions also keeps the execution history and shows the current state of every execution, so the team no longer maintains state, retries, or error handling in code. Express Workflows run for a maximum of five minutes and do not support the callback pattern, so a multi-day approval is impossible. SNS is a fan-out notification service: it holds no workflow state, provides no per-step retry or visibility, and an email reply is not an approval mechanism. EventBridge with polling rebuilds the orchestration in custom code, which is exactly the overhead the company wants to remove."
  },
  {
    "id": 240,
    "domain": 2,
    "ts": "2.1",
    "q": "A company is moving a Java application from its data center to Amazon EC2. The application talks to an existing message broker through the JMS API, and it also exchanges messages with partner systems over the AMQP and MQTT protocols. The company wants to keep its messaging code and its wire protocols unchanged during the move, and it does not want to patch, monitor, or scale broker servers itself. Which solution meets these requirements?",
    "options": [
      "Use Amazon MQ for Apache ActiveMQ and point the application at the managed broker endpoints.",
      "Use Amazon SQS FIFO queues and rewrite the producers and consumers to call the Amazon SQS API.",
      "Use Amazon SNS topics with Amazon SQS subscriptions and rewrite the partner integrations to call the AWS APIs.",
      "Deploy Apache ActiveMQ on a fleet of Amazon EC2 instances in an Auto Scaling group behind a Network Load Balancer."
    ],
    "correct": 0,
    "explanation":
      "Amazon MQ is a managed message broker service for Apache ActiveMQ and RabbitMQ. The ActiveMQ engine supports industry-standard APIs and protocols including JMS, AMQP, MQTT, STOMP, and OpenWire, so the application and the partner systems keep working without code changes while AWS handles provisioning, patching, and monitoring of the broker. Amazon SQS and Amazon SNS are AWS-specific services reached through the AWS API; they support neither JMS nor AMQP nor MQTT, so both options force the rewrite the company explicitly wants to avoid. Self-managing ActiveMQ on EC2 does preserve the protocols, but the company would remain responsible for patching, failover, and scaling the brokers, which the requirements rule out."
  },
  {
    "id": 241,
    "domain": 2,
    "ts": "2.1",
    "q": "A mobile application displays a dashboard that combines data held in an Amazon DynamoDB table, an Amazon Aurora Serverless database, and an AWS Lambda function. Client developers report that rendering one screen requires several round trips and returns many fields the app never displays. The application must also push updates to connected clients as soon as a record changes. A solutions architect must minimize both backend code and client round trips. Which solution meets these requirements?",
    "options": [
      "Create an Amazon API Gateway REST API with one resource per data source and enable response caching on each stage.",
      "Deploy containers behind an Application Load Balancer that query the three data sources and expose an aggregated REST API.",
      "Create an Amazon API Gateway WebSocket API and have the clients poll each of the three data sources through separate routes.",
      "Create an AWS AppSync GraphQL API with a resolver for each data source and use GraphQL subscriptions for the live updates."
    ],
    "correct": 3,
    "explanation":
      "AWS AppSync is a managed GraphQL service: a single query resolved against DynamoDB, Aurora Serverless, and Lambda data sources returns exactly the fields the client asks for in one request, and GraphQL subscriptions deliver real-time updates over WebSocket connections that AppSync manages. A REST API with one resource per source keeps the round trips and the over-fetching, and caching does not change either. Aggregating in containers behind an ALB solves the round trips but adds a service the team must write, deploy, scale, and patch, and it still needs a separate mechanism for live updates. A WebSocket API used for polling is a contradiction: polling defeats the purpose of the persistent connection, and API Gateway offers no field-level selection."
  },
  {
    "id": 242,
    "domain": 2,
    "ts": "2.1",
    "q": "A company stores its customer records in Salesforce. The analytics team needs those records delivered into an Amazon S3 bucket every night, with source fields mapped to target names and with records filtered before they are written. The company has no developers available to build and maintain API integration code, and it does not want to run any servers for the transfer. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Run a scheduled AWS Glue job that calls the Salesforce REST API, applies the transformations, and writes the records to Amazon S3.",
      "Configure an Amazon AppFlow flow from Salesforce to Amazon S3 on a nightly schedule, with mapping and filter tasks in the flow.",
      "Create an AWS Lambda function triggered by Amazon EventBridge Scheduler that pages through the Salesforce API and writes to Amazon S3.",
      "Launch an Amazon EC2 instance that runs an extract script on a cron schedule and uploads the resulting files to Amazon S3."
    ],
    "correct": 1,
    "explanation":
      "Amazon AppFlow is a fully managed integration service with built-in connectors for SaaS applications such as Salesforce. A flow is configured, not coded: the destination is an S3 bucket, the trigger can be a schedule, and mapping, filtering, and validation are declarative tasks inside the flow. A scheduled AWS Glue job still requires someone to write and maintain the Salesforce API extraction logic inside the script, including pagination and authentication. The Lambda function has the same problem, with the added burden of packaging, retries, and the function timeout on large extracts. The EC2 instance is the highest overhead of all: the company patches, monitors, and pays for an instance, and the script remains custom code that nobody is available to maintain."
  },
  {
    "id": 243,
    "domain": 2,
    "ts": "2.1",
    "q": "A company receives daily data files from hundreds of trading partners whose systems can only send files over SFTP. The upload volume is spiky and more than triples at month end. The files must land directly in an Amazon S3 bucket so that existing analytics jobs can read them without a copy step, and the operations team does not want to run, patch, or scale any SFTP servers. Which solution meets these requirements?",
    "options": [
      "Deploy an SFTP server on Amazon EC2 instances in an Auto Scaling group and copy the uploaded files to Amazon S3 with a cron job.",
      "Deploy AWS DataSync agents in each partner's data center and schedule tasks that copy the files into the Amazon S3 bucket.",
      "Create an AWS Transfer Family server with the SFTP protocol enabled and Amazon S3 as the storage backend for the partner users.",
      "Generate Amazon S3 presigned URLs for each partner and ask the partners to upload their files over HTTPS instead of SFTP."
    ],
    "correct": 2,
    "explanation":
      "AWS Transfer Family provides a fully managed SFTP endpoint in front of Amazon S3. Partners keep their existing SFTP clients and credentials, the files are written straight into the bucket as objects, and AWS scales the endpoint, so the month-end spike needs no capacity planning. An SFTP server on EC2 meets the protocol requirement but leaves the company operating and scaling the servers, plus a copy job that delays the analytics. AWS DataSync inverts the direction of the transfer: DataSync agents are deployed on infrastructure the company would have to install and manage inside each partner site, and it gives partners no endpoint to push to. Presigned URLs require the partners to change protocol, which the stem states they cannot do."
  },
  {
    "id": 244,
    "domain": 2,
    "ts": "2.1",
    "q": "A small development team must deploy an existing Java web application on AWS. The team wants load balancing, automatic scaling, rolling deployments, and application health reporting, but has nobody to write or maintain infrastructure code. The team also needs shell access to the underlying Amazon EC2 instances for troubleshooting, and it wants to keep deploying the WAR artifacts its build pipeline already produces. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Create an AWS Elastic Beanstalk environment for the Java platform and deploy the existing WAR file to it.",
      "Package the application as a container image and deploy it with AWS Lambda container image support behind a function URL.",
      "Write an AWS CloudFormation template that creates an Application Load Balancer, an Auto Scaling group, and CloudWatch alarms.",
      "Deploy the application as an Amazon ECS service on AWS Fargate behind an Application Load Balancer."
    ],
    "correct": 0,
    "explanation":
      "Elastic Beanstalk takes an application artifact such as a WAR file and provisions and manages the load balancer, the Auto Scaling group, and the health reporting for it, while leaving the EC2 instances in the customer's account where the team can connect to them. Deployment policies such as rolling deployments are configuration settings, not code. AWS Lambda forces the team to repackage the application for the Lambda programming model and gives no access to instances, because there are none. A CloudFormation template delivers the same building blocks but as infrastructure code that the team has stated it cannot maintain. Amazon ECS on Fargate requires containerizing the application, and Fargate tasks run on infrastructure the team cannot log in to."
  },
  {
    "id": 245,
    "domain": 2,
    "ts": "2.1",
    "q": "A manufacturing company runs containerized workloads in three factories on servers that must stay on site because of latency and data residency rules. The company wants to keep using those existing servers and add no new hardware. It also runs containers in AWS, and it wants a single control plane, one scheduler, and one set of tooling for both environments rather than a separate orchestration stack in every factory. Which solution meets these requirements?",
    "options": [
      "Install AWS Outposts racks in each factory and run Amazon ECS on the Outposts capacity in each site.",
      "Register the existing on-premises servers as Amazon ECS Anywhere external instances in an Amazon ECS cluster in AWS.",
      "Run Amazon ECS on AWS Fargate in the nearest AWS Region and connect each factory to that Region with AWS Direct Connect.",
      "Install a self-managed Kubernetes cluster in each factory and manage the three clusters from a shared bastion host."
    ],
    "correct": 1,
    "explanation":
      "Amazon ECS Anywhere lets customer-managed servers, on premises or elsewhere, be registered as external instances in an ECS cluster whose control plane runs in AWS. Tasks are defined, scheduled, and monitored the same way in both environments, and the factories keep their existing hardware. AWS Outposts does provide a consistent control plane, but it is AWS-owned hardware that must be installed in each site, which the stem rules out. Running the tasks on Fargate in a Region moves the workload out of the factories, so the latency and data residency requirements are broken. Self-managed clusters leave the company operating three independent Kubernetes stacks with their own tooling, which is the fragmentation the company wants to eliminate."
  },
  {
    "id": 246,
    "domain": 2,
    "ts": "2.1",
    "q": "A social media company lets users upload photos to an Amazon S3 bucket. Every photo must be checked for explicit and suggestive content and labeled with the objects it contains before it is published to the feed. The check must not block the upload request, and the company employs no machine learning engineers and does not want to train, tune, or host a model. Which solution meets these requirements?",
    "options": [
      "Train an image classification model in Amazon SageMaker with labeled training data and invoke a real-time inference endpoint from the web tier before each photo is stored.",
      "Call Amazon Comprehend on the object metadata of each uploaded photo to detect inappropriate content and labels.",
      "Run an open source computer vision library on a fleet of GPU Amazon EC2 instances that the web tier calls synchronously.",
      "Configure an Amazon S3 event notification that invokes an AWS Lambda function calling Amazon Rekognition content moderation and label detection."
    ],
    "correct": 3,
    "explanation":
      "Amazon Rekognition is a managed computer vision service: the content moderation operation returns moderation labels for explicit and suggestive material, and label detection returns the objects in the image, with no model to train or host. Driving it from an S3 event notification keeps the analysis asynchronous, so the upload response is never delayed. Training a SageMaker model requires the machine learning skills, labeled training data, and endpoint capacity the company does not have, and calling it from the web tier makes the upload synchronous. Amazon Comprehend analyzes text, not images, and the object metadata says nothing about the pixel content. A self-managed computer vision fleet means building, scaling, and paying for a GPU fleet, and the synchronous call again blocks the upload."
  },
  {
    "id": 247,
    "domain": 2,
    "ts": "2.1",
    "q": "An insurance company receives thousands of scanned claim forms as PDF and image files each day. For each document the company must extract the printed text, the key-value pairs of the completed form fields, and the contents of the tables, in a structured format that downstream systems can consume. Daily volume varies widely, and the company does not want to build, train, or host its own document model. Which solution meets these requirements?",
    "options": [
      "Configure an Amazon S3 Object Lambda access point that converts each document to structured text when it is retrieved.",
      "Call Amazon Comprehend on the scanned documents to return the form fields and the table contents as structured output.",
      "Submit the documents to Amazon Textract asynchronous document analysis and write the extracted blocks to Amazon S3.",
      "Index the documents with Amazon Kendra and query the index to retrieve the value of each form field."
    ],
    "correct": 2,
    "explanation":
      "Amazon Textract goes beyond optical character recognition: document analysis extracts printed text, form data as key-value pairs, and table structures, and the asynchronous API is designed for multipage PDF and image documents processed in bulk, so the variable daily volume needs no capacity planning. S3 Object Lambda only moves the problem: it runs code the company must still write to perform the extraction. Amazon Comprehend derives insights from text that has already been extracted and cannot read a scanned image. Amazon Kendra is an enterprise search service that returns relevant passages for a question rather than a structured record of every field and table."
  },
  {
    "id": 248,
    "domain": 2,
    "ts": "2.1",
    "q": "A retail company collects millions of product reviews written in English. For each review, the analytics team needs the overall sentiment and the product names, brands, and locations that the text mentions, so the results can be aggregated in a dashboard. The team has no machine learning expertise and wants a managed service that its existing processing pipeline can call directly. Which solution meets these requirements?",
    "options": [
      "Call Amazon Comprehend sentiment analysis and entity detection from the pipeline and store the returned results for the dashboard.",
      "Index the reviews in Amazon Kendra and query the index for the sentiment and the entities of each review.",
      "Train a custom natural language model in Amazon SageMaker and deploy it behind a real-time inference endpoint that the existing processing pipeline calls for every review.",
      "Send the review text to Amazon Textract and read the sentiment scores and entities from the analysis response."
    ],
    "correct": 0,
    "explanation":
      "Amazon Comprehend is a managed natural language processing service whose sentiment analysis returns positive, negative, neutral, or mixed for a document, and whose entity detection returns typed entities such as organizations, commercial items, and locations. Both are simple API calls, which suits a team with no machine learning skills. Amazon Kendra is an intelligent search service: it finds documents and passages that answer a question but does not score sentiment or return an entity list per review. A custom SageMaker model would work but requires the expertise, training data, and endpoint operations the team does not have. Amazon Textract extracts text and structure from scanned documents; it performs no sentiment or entity analysis."
  },
  {
    "id": 249,
    "domain": 2,
    "ts": "2.1",
    "q": "A media company stores recorded customer support calls as audio files in Amazon S3. The company must produce a written transcript of every recording, and it must then publish each transcript in Spanish and in German for its regional support teams. The company wants managed services that its existing pipeline can call, and it does not want to train or host any models. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Use Amazon Polly to convert the recorded audio files into written transcripts.",
      "Use Amazon Transcribe to convert the recorded audio files into text transcripts.",
      "Use Amazon Kendra to index the recordings and export the indexed content as the transcripts.",
      "Use Amazon Translate to convert each transcript into Spanish and into German.",
      "Use Amazon Comprehend to convert each transcript into Spanish and into German."
    ],
    "correct": [1, 3],
    "explanation":
      "Amazon Transcribe is the managed automatic speech recognition service that converts recorded audio into text, and Amazon Translate is the managed neural machine translation service that converts that text from one language into another, so the two together satisfy both requirements with API calls only. Amazon Polly does the opposite of what is needed: it synthesizes lifelike speech from text. Amazon Kendra is an enterprise search service over documents; it neither transcribes audio nor produces transcript files. Amazon Comprehend analyzes text to return insights such as sentiment, entities, key phrases, and the dominant language, but it does not translate text, which is Amazon Translate's job."
  },
  {
    "id": 250,
    "domain": 2,
    "ts": "2.1",
    "q": "A company keeps internal policies, contracts, and manuals in Amazon S3, in SharePoint, and in a document database. Employees must be able to ask a question in plain English, such as when a particular benefit applies, and receive a specific answer or the relevant passage rather than a list of file names. The company wants a managed service with prebuilt connectors and no search cluster to operate. Which solution meets these requirements?",
    "options": [
      "Create an Amazon OpenSearch Service domain and populate it with a custom crawler written for each of the three document repositories.",
      "Deploy an Amazon Kendra index with connectors to the repositories and query it from the company intranet portal.",
      "Extract entities from the documents with Amazon Comprehend and store them in Amazon DynamoDB for keyword lookup.",
      "Store all the documents in Amazon S3 and let employees query them with SQL statements in Amazon Athena."
    ],
    "correct": 1,
    "explanation":
      "Amazon Kendra is a managed intelligent search service built for natural language questions: it returns a suggested answer or the passage that answers the question, and it ships with connectors for repositories such as Amazon S3 and SharePoint, so no crawler and no search cluster have to be built or operated. Amazon OpenSearch Service can index the same content but requires a custom crawler per repository, cluster sizing and patching, and relevance tuning, and it answers with keyword matches. Extracting entities with Amazon Comprehend reduces rich documents to a lookup table, which cannot answer a question about when a benefit applies. Amazon Athena requires SQL skills and structured data; unstructured policy documents are not queryable that way."
  },
  {
    "id": 251,
    "domain": 2,
    "ts": "2.1",
    "q": "A company runs its applications on Amazon EKS in AWS. A regulated business unit in another country must run the same Kubernetes workloads inside its own data center, on a cluster that keeps scheduling and healing workloads even while the site has no connection to AWS. The platform team wants AWS-supported Kubernetes tooling, a consistent cluster configuration, and the same deployment manifests in both of the two environments. Which solution meets these requirements?",
    "options": [
      "Register the data center servers with Amazon ECS Anywhere and redeploy the Kubernetes workloads as Amazon ECS tasks.",
      "Create an Amazon EKS cluster in AWS and attach the data center servers to it as hybrid nodes over AWS Direct Connect.",
      "Use the Amazon EKS Connector to register the data center cluster so that it is visible in the Amazon EKS console.",
      "Deploy Amazon EKS Anywhere on the data center infrastructure to create and operate a local Kubernetes cluster."
    ],
    "correct": 3,
    "explanation":
      "Amazon EKS Anywhere creates and operates Kubernetes clusters on infrastructure the customer manages, with AWS-supported tooling and the same cluster configuration used in Amazon EKS. Because the control plane runs locally, the cluster keeps operating when the site is disconnected from AWS. Amazon ECS Anywhere abandons Kubernetes for a different orchestrator and requires rewriting every workload definition. EKS Hybrid Nodes is a real capability, but the control plane stays in the AWS Region, so a loss of connectivity leaves the on-premises nodes without a control plane, which breaks the stated requirement. The Amazon EKS Connector only surfaces an existing cluster in the console for visibility; it does not create, configure, or support the cluster."
  },
  {
    "id": 252,
    "domain": 2,
    "ts": "2.1",
    "q": "A company processes clickstream events with a workflow of three short AWS Lambda functions chained together by custom code. The workflow runs millions of times per day, every run finishes in less than one minute, and every step is idempotent. The team wants managed orchestration with built-in retries and error handling, while keeping the cost of the orchestration layer as low as possible. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Use an AWS Step Functions Standard Workflow, which is billed according to the number of state transitions.",
      "Keep the chained Lambda functions and add custom retry logic with an Amazon DynamoDB table holding the state.",
      "Publish every event to an Amazon SNS topic that has one Lambda function subscribed for each of the three steps.",
      "Use an AWS Step Functions Express Workflow, which is billed by number of executions, duration, and memory."
    ],
    "correct": 3,
    "explanation":
      "Express Workflows are designed for high-volume event processing workloads, run for up to five minutes, and are priced by the number of executions, their duration, and the memory consumed, which is far cheaper than per-transition pricing at millions of runs per day. Their at-least-once execution model is acceptable here because every step is idempotent. Standard Workflows are billed per state transition and provide exactly-once execution and durations up to one year, neither of which this workload needs, so the company would pay for guarantees it does not use. Adding custom retry logic keeps the orchestration code the team wants to remove. An SNS topic fans the event out to three subscribers in parallel, so the steps no longer run in sequence and there is no workflow-level retry or error handling."
  },
  {
    "id": 253,
    "domain": 2,
    "ts": "2.2",
    "q": "A company runs an internal application behind an internal Application Load Balancer in a private subnet, with an identical standby stack in a second Region. A solutions architect must configure Amazon Route 53 DNS failover between the two Regions, but the health checkers cannot reach the primary endpoint because the load balancer has only private IP addresses and the company will not expose it to the internet. Which solution meets these requirements?",
    "options": [
      "Associate an Elastic IP address with the internal load balancer and create an endpoint health check against that address.",
      "Create a calculated health check that reports healthy when at least one of the other health checks configured in the account is healthy.",
      "Publish an application metric to Amazon CloudWatch, create an alarm on it, and create a Route 53 health check that monitors that alarm.",
      "Create a TCP endpoint health check that targets the private IP address of the internal load balancer on the application port."
    ],
    "correct": 2,
    "explanation":
      "Route 53 health checkers run on the public internet and cannot check endpoints whose IP addresses are private, local, nonroutable, or multicast, which rules out a TCP health check aimed at the private address of the load balancer. Route 53 does offer a health check type that monitors the data stream of a CloudWatch alarm in the same account, so publishing an application health metric, alarming on it, and pointing the health check at that alarm lets the failover records react to the private endpoint's real state. Attaching an Elastic IP address does not work: an internal Application Load Balancer uses private addresses in its subnets and does not take an Elastic IP address. A calculated health check aggregates other health checks; it still needs an underlying check that can actually observe the endpoint, which is the missing piece."
  },
  {
    "id": 254,
    "domain": 2,
    "ts": "2.2",
    "q": "A company runs a legacy TCP application on several Amazon EC2 instances that have Elastic IP addresses in different Availability Zones. A licensing restriction prevents the company from placing the instances behind a load balancer. The company wants DNS to spread client requests across the instances and to stop returning the address of any instance that has failed, using Amazon Route 53 only. Which solution meets these requirements?",
    "options": [
      "Create one simple routing record for the application that lists all of the Elastic IP addresses as its values.",
      "Create weighted records with an equal weight for each Elastic IP address and do not associate any health checks.",
      "Create latency-based routing records so that each client is sent to the instance in the Region with the lowest measured network latency.",
      "Create one multivalue answer record per instance and associate a Route 53 health check with each of those records."
    ],
    "correct": 3,
    "explanation":
      "Multivalue answer routing returns up to eight healthy records per query, gives different answers to different resolvers so requests are spread roughly at random, and returns a value only while its associated health check is healthy. AWS states this is not a substitute for a load balancer, but it is exactly the DNS-level uptime and load-sharing mechanism the stem asks for. A simple record with several values also returns all of the addresses in random order, but a simple record cannot be associated with health checks, so failed instances keep being handed out. Weighted records created without health checks have the same defect. Latency-based routing selects a Region based on measured network latency; it does not distribute traffic among instances or remove failed ones."
  },
  {
    "id": 255,
    "domain": 2,
    "ts": "2.2",
    "q": "An organization uses AWS Organizations with more than 60 member accounts. The security team must enforce one backup schedule and one retention policy for Amazon EBS volumes, Amazon RDS databases, and Amazon DynamoDB tables in every account, copy those backups to a second Region, and report on resources that are not protected. Application teams must not be able to change or remove the schedule. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Create a backup policy in AWS Organizations that applies an AWS Backup plan with a cross-Region copy, and report with AWS Backup Audit Manager.",
      "Create an AWS Backup plan in each member account with the required rules, and audit the plans with a script that runs every month.",
      "Use Amazon Data Lifecycle Manager in each member account to schedule snapshots of every one of the resource types and copy them to the second Region.",
      "Schedule an AWS Lambda function in each member account that creates a snapshot of each resource and copies it to the second Region."
    ],
    "correct": 0,
    "explanation":
      "AWS Backup policies are an AWS Organizations policy type: the management account attaches a policy containing a backup plan to organizational units, the plan is created in every member account, and member accounts cannot modify or delete it. Copy actions in the plan replicate recovery points to a vault in a second Region, and AWS Backup Audit Manager reports on unprotected resources. Per-account backup plans produce the same backups but rely on every team keeping its own plan correct, with custom auditing. Amazon Data Lifecycle Manager fails on scope: it automates Amazon EBS snapshots and EBS-backed AMIs, not RDS or DynamoDB. Per-account Lambda functions rebuild a backup service in custom code in 60 accounts, with no central enforcement or reporting."
  },
  {
    "id": 256,
    "domain": 2,
    "ts": "2.2",
    "q": "A financial services company must guarantee to its regulator that backups cannot be deleted, nor their retention shortened, before a seven-year retention period ends. This must hold even for an administrator with full permissions and for the account root user. The backups are already centralized in an AWS Backup vault, and the security team wants a write-once, read-many configuration that cannot be reversed once it takes effect. Which solution meets these requirements?",
    "options": [
      "Attach a vault access policy to the backup vault that denies the backup:DeleteRecoveryPoint action for every principal in the account.",
      "Apply AWS Backup Vault Lock to the vault in compliance mode with the required minimum retention period, and let the grace time expire.",
      "Apply AWS Backup Vault Lock to the vault in governance mode with the required minimum retention period and a long maximum retention period.",
      "Copy every recovery point to an Amazon S3 bucket on which versioning and MFA delete have been enabled for the security team."
    ],
    "correct": 1,
    "explanation":
      "AWS Backup Vault Lock enforces a write-once, read-many configuration on a vault. In compliance mode the lock has a grace time of at least three days during which it can still be removed; once that grace time expires the vault and its lock become immutable and cannot be changed or deleted by any user, including the root user, or by AWS, and delete or lifecycle-change requests on recovery points are denied. Governance mode is designed so that principals with sufficient IAM permissions can remove the lock, so it does not resist a determined administrator. A vault access policy is an IAM-based control that any principal able to edit the policy can undo. Copying recovery points to Amazon S3 does not apply: AWS Backup recovery points live in backup vaults and are copied to other vaults, not into a customer S3 bucket."
  },
  {
    "id": 257,
    "domain": 2,
    "ts": "2.2",
    "q": "A company must move 200 physical and virtual servers from its data center to Amazon EC2. The applications are business critical and must keep serving users throughout the project, the cutover window for each migration wave is only a few minutes, and the company does not want to rewrite or re-architect the applications. The team also wants to boot and test each server in AWS before the final cutover. Which solution meets these requirements?",
    "options": [
      "Export the disks of each server, import them with VM Import/Export to create Amazon Machine Images, and launch the instances from those images during the cutover window.",
      "Copy the file systems of every server to Amazon S3 with AWS DataSync and rebuild each server in Amazon EC2 with user data scripts.",
      "Install the AWS Application Migration Service replication agents, replicate the servers continuously into a staging area, test them, then cut over each wave.",
      "Use AWS Database Migration Service to replicate the servers into Amazon EC2 and redirect the users once replication has caught up."
    ],
    "correct": 2,
    "explanation":
      "AWS Application Migration Service installs an agent on each source server and replicates it continuously at block level into a staging area in the AWS account while the source keeps running. Test instances can be launched from the replicated data without disrupting production, and because replication is already in sync, the cutover itself takes only minutes and needs no application changes. VM Import/Export is a point-in-time export: the disks are stale by the time the images are built, so the cutover requires a long freeze of the source servers. AWS DataSync copies data but not the servers, and rebuilding 200 machines from scripts is a re-architecture the company excluded. AWS DMS is the wrong service here: it migrates databases, not whole servers."
  },
  {
    "id": 258,
    "domain": 2,
    "ts": "2.2",
    "q": "A company must migrate a 4 TB Oracle database from its data center to Amazon Aurora PostgreSQL. The database serves a production application that can tolerate only a few minutes of downtime at cutover, so the source must stay available and the target must be kept in sync until the switch. The schema contains stored procedures and data types that PostgreSQL does not support natively. Which solution meets these requirements?",
    "options": [
      "Export the Oracle database, copy the dump file to Amazon S3 with AWS DataSync, and import it into Aurora PostgreSQL during an extended weekend maintenance window.",
      "Replicate the database server into Amazon EC2 with AWS Application Migration Service and point the application at the replicated server.",
      "Run an AWS Database Migration Service full load task and stop the application until the full load into Aurora PostgreSQL has completed.",
      "Convert the schema and stored procedures with the AWS Schema Conversion Tool, then run an AWS DMS task with full load and change data capture."
    ],
    "correct": 3,
    "explanation":
      "This is a heterogeneous migration, so two tools are needed. The AWS Schema Conversion Tool converts the Oracle schema, including stored procedures and unsupported data types, into their Aurora PostgreSQL equivalents and reports what must be changed by hand. AWS DMS then performs the full load and, with change data capture enabled, applies ongoing changes so the target stays in sync while the source keeps serving traffic, which reduces the cutover to minutes. The export and import is a bulk operation whose downtime is measured in hours for 4 TB, and it converts nothing. Application Migration Service lifts the server into EC2, so the company ends up running Oracle on EC2 rather than Aurora PostgreSQL. A full load task on its own omits the schema conversion and requires downtime for the whole full load."
  },
  {
    "id": 259,
    "domain": 2,
    "ts": "2.2",
    "q": "A company must add a disaster recovery plan in a second AWS Region for a three-tier application. The business accepts a recovery time objective of about one hour, but requires that the copy of the database in the second Region be no more than seconds behind the primary. To control cost, the company refuses to pay for application servers that run while the primary Region is healthy, and it has chosen a pilot light strategy. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Replicate the database continuously to the second Region so that a running copy of the data is always available there.",
      "Run a scaled-down but fully functional copy of the application tier in the second Region and scale it up when a disaster is declared.",
      "Copy nightly database snapshots to the second Region and restore them into a new database only after a disaster is declared.",
      "Keep current Amazon Machine Images and launch templates in the second Region and launch the application instances only at failover.",
      "Run the full application tier in both Regions behind Route 53 weighted records so that both Regions serve user traffic at all times."
    ],
    "correct": [0, 3],
    "explanation":
      "In a pilot light strategy the data layer is live and continuously replicated in the recovery Region, while the compute layer exists only as configuration, so nothing is serving and almost nothing is paid for until a disaster is declared. Continuous replication of the database and pre-built AMIs with launch templates are the two halves of that: continuous replication satisfies the requirement that the database be seconds behind, and pre-built images plus launch templates let the application tier be launched quickly enough for a one-hour RTO. Running a scaled-down copy of the application tier describes warm standby, where a scaled-down but running copy of the application tier costs money continuously, which the company refuses. Copying nightly snapshots describes backup and restore, whose recovery point would be up to a day, breaking the seconds requirement. Running the full stack in both Regions describes a multi-site active/active setup, the most expensive of the four strategies."
  },
  {
    "id": 260,
    "domain": 2,
    "ts": "2.2",
    "q": "A company deploys a web application with AWS Elastic Beanstalk. During every deployment some users receive errors, because the new version is installed on the instances that are currently serving traffic. The company requires that the version in service never be modified in place, that the new version be validated before any user reaches it, and that a bad release be reverted within minutes. Which approach will meet these requirements?",
    "options": [
      "Deploy the new version to a second Elastic Beanstalk environment, validate it, and swap the environment CNAMEs once it is healthy.",
      "Change the deployment policy to rolling with an additional batch so that a new batch of instances is launched before each batch is updated.",
      "Keep the all at once deployment policy but schedule every deployment inside an announced overnight maintenance window.",
      "Raise the minimum capacity of the Auto Scaling group and keep the standard rolling deployment policy for every release."
    ],
    "correct": 0,
    "explanation":
      "Swapping environment CNAMEs is the blue/green pattern in Elastic Beanstalk: the new version is deployed to a separate environment where it can be tested on its own URL, the running environment is never touched, and the swap redirects traffic in one step. If the release is bad, swapping the CNAMEs back restores service within minutes. A rolling deployment with an additional batch reduces capacity loss during the deployment, but the existing instances are still updated in place batch by batch and a rollback means deploying the previous version again. An all at once deployment at night only moves the errors to the middle of the night and still updates every instance at once. Raising the minimum capacity adds instances but keeps the same in-place rolling update and offers no validation step or fast rollback."
  },
  {
    "id": 261,
    "domain": 2,
    "ts": "2.2",
    "q": "A company runs a message broker on Amazon MQ for Apache ActiveMQ as a single-instance broker. When the underlying infrastructure failed during a maintenance event, producers and consumers were disconnected for a long period and queued messages could not be delivered. The company now wants the broker to survive the loss of one Availability Zone, with automatic failover and no loss of persistent messages. Which solution meets these requirements?",
    "options": [
      "Create a second single-instance broker in another Availability Zone and configure the client applications to alternate between the two broker endpoints.",
      "Recreate the broker in the active/standby deployment mode across two Availability Zones and use the failover transport in the client connection URI.",
      "Enable automatic minor version upgrades on the existing broker and schedule daily snapshots of the broker configuration and its data.",
      "Register two independent single-instance brokers as targets of a Network Load Balancer and publish the load balancer endpoint to the clients."
    ],
    "correct": 1,
    "explanation":
      "An active/standby broker for ActiveMQ is a pair of brokers in two Availability Zones that share durable storage: if the active broker or its Availability Zone fails, the standby takes over automatically with the persisted messages intact. Clients use the failover transport with both endpoints so they reconnect to whichever broker is active. A second single-instance broker creates two unrelated brokers: messages persisted on the failed one stay unavailable, and clients see two separate sets of queues. The Network Load Balancer design has the same defect and adds a load balancer that cannot merge broker state; it would route sessions to a broker holding different messages. Automatic upgrades and snapshots keep a single point of failure, since upgrades and snapshots provide no automatic failover across Availability Zones."
  },
  {
    "id": 262,
    "domain": 2,
    "ts": "2.2",
    "q": "A company serves a read-only content website through Amazon CloudFront. The origin is an Application Load Balancer in one Region, and an identical stack runs in a second Region. When the primary origin returns HTTP 5xx responses or times out, the company wants CloudFront to retry the request against the second Region automatically, without waiting for cached DNS records in client resolvers to expire. Which solution meets these requirements?",
    "options": [
      "Create a Route 53 failover record set for the two load balancers with a health check and set the record time to live to zero.",
      "Create a second CloudFront distribution for the standby Region and ask clients to retry the other domain name after an error.",
      "Create a CloudFront origin group containing both origins and configure the failover criteria on the relevant HTTP status codes.",
      "Enable caching of error responses in CloudFront with a long minimum time to live so that errors are served from the edge cache instead of the origin."
    ],
    "correct": 2,
    "explanation":
      "A CloudFront origin group contains a primary and a secondary origin plus a list of status codes that trigger failover. When the primary origin returns one of those codes or the connection times out, CloudFront retries the same request against the secondary origin, so recovery happens inside the distribution and no DNS change is involved. Route 53 failover is a valid Region-level mechanism, but it depends on resolvers honoring the record time to live, which the stem excludes, and a time to live of zero is not guaranteed to be respected. A second distribution pushes the failover logic onto every client. Caching error responses is the opposite of what is needed: caching error responses for longer serves the failure to more users."
  },
  {
    "id": 263,
    "domain": 2,
    "ts": "2.2",
    "q": "A company runs a web application on Amazon EC2 instances behind an Application Load Balancer, with an Amazon RDS for MySQL database, in a single AWS Region. The company must be able to serve the application from a second Region if the primary Region becomes unavailable, with a recovery point objective of minutes, and the redirection of user traffic must happen without manual DNS edits. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Convert the RDS for MySQL database to a Multi-AZ deployment in the primary Region.",
      "Create a cross-Region read replica of the RDS for MySQL database in the second Region and promote it during a failover.",
      "Create Route 53 weighted records that send half of the user traffic to each of the two Regions at all times.",
      "Create an Amazon CloudWatch alarm on the load balancer, and notify the operations team through Amazon SNS so that an engineer can update the DNS records when it triggers.",
      "Create Route 53 failover records for the two load balancers, with a health check associated with the primary record."
    ],
    "correct": [1, 4],
    "explanation":
      "A cross-Region read replica keeps a copy of the data in the second Region within minutes of the primary and can be promoted to a standalone database at failover, which meets the recovery point objective. Route 53 failover records with a health check on the primary load balancer send users to the secondary Region automatically as soon as the primary is judged unhealthy, with no manual DNS edit. A Multi-AZ deployment protects against the loss of one Availability Zone inside the primary Region and does nothing when the whole Region is unavailable. Weighted records split traffic permanently regardless of health, so half of the users would break during an outage. An alarm and a notification tell the team about the failure but redirect no traffic."
  },
  {
    "id": 264,
    "domain": 2,
    "ts": "2.2",
    "q": "A company exposes an AWS Transfer Family SFTP endpoint to its partners. The partners' firewalls allow outbound connections only to a fixed list of IP addresses, so the addresses of the endpoint must never change. The endpoint must also stay reachable if a single Availability Zone becomes impaired, and the company does not want to add servers of its own to the design. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Keep the publicly accessible endpoint and send the partners the current IP addresses of the service at the start of every month.",
      "Change the server to a VPC-hosted endpoint that is internet-facing, associate Elastic IP addresses with it, and select subnets in several Availability Zones.",
      "Put a Network Load Balancer with an Elastic IP address in front of the publicly accessible Transfer Family endpoint and give partners the load balancer's DNS name.",
      "Replace the service with SFTP servers on Amazon EC2 instances in two Availability Zones behind a Network Load Balancer that has Elastic IP addresses."
    ],
    "correct": 1,
    "explanation":
      "A Transfer Family server can use an endpoint hosted in a VPC and made internet-facing, in which case Elastic IP addresses are associated with the endpoint. Those addresses are owned by the account and never change, so partner firewall rules stay valid, and selecting subnets in several Availability Zones keeps the endpoint reachable when one of them is impaired. The publicly accessible endpoint does not give stable addresses: the addresses behind a publicly accessible endpoint are managed by the service and are not guaranteed to persist. A Network Load Balancer does not work, because the publicly accessible endpoint is a service-managed endpoint that cannot be registered as a target of a Network Load Balancer. Self-managed SFTP servers provide static addresses and multiple Availability Zones, but the company returns to patching, scaling, and monitoring its own SFTP fleet."
  },
  {
    "id": 265,
    "domain": 2,
    "ts": "2.2",
    "q": "A company runs a web application on Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer. From time to time the application process hangs and returns HTTP 500 responses while the instance keeps passing its EC2 status checks. The load balancer marks the target as unhealthy and stops sending it requests, but the Auto Scaling group never replaces the instance and capacity silently degrades. Which solution meets these requirements?",
    "options": [
      "Increase the health check interval and the unhealthy threshold on the target group so that the load balancer reacts more slowly.",
      "Create an Amazon CloudWatch alarm on the HTTPCode_Target_5XX_Count metric and attach a step scaling policy to the Auto Scaling group.",
      "Enable sticky sessions on the target group so that a client is always sent back to the instance that served its first request.",
      "Configure the Auto Scaling group to use Elastic Load Balancing health checks in addition to the Amazon EC2 status checks."
    ],
    "correct": 3,
    "explanation":
      "By default an Auto Scaling group replaces an instance only when the EC2 status checks fail, which is why a hung application on a healthy virtual machine is never replaced. Adding the Elastic Load Balancing health check to the group makes it treat the load balancer's verdict as the instance's health, so the group terminates the failing instance and launches a replacement, restoring capacity automatically. Changing the interval and the threshold makes detection slower; it does not make the replacement happen. A step scaling policy adds instances while leaving the broken one in the group, so the underlying problem persists and cost rises. Sticky sessions make the situation worse: pinning clients to a specific instance sends the same users back to the failing target."
  },
  {
    "id": 266,
    "domain": 2,
    "ts": "2.2",
    "q": "A company runs a customer-facing API as an Amazon ECS service on AWS Fargate. All of the tasks currently run in a single subnet in one Availability Zone behind an Application Load Balancer. During a recent impairment of that Availability Zone the API was completely unavailable. The company wants the API to keep serving traffic when one Availability Zone fails, and it does not want to manage Amazon EC2 capacity. Which solution meets these requirements?",
    "options": [
      "Update the service to run its tasks in subnets in three Availability Zones and raise the desired count so the tasks are spread across them.",
      "Create a second Amazon ECS cluster in another AWS Region and route users to the two Regions with a Route 53 latency-based record.",
      "Change the service launch type to Amazon EC2 and place all of the container instances of the cluster in a single cluster placement group.",
      "Increase the CPU and memory reserved by each task and enable Amazon ECS Service Auto Scaling within the existing subnet."
    ],
    "correct": 0,
    "explanation":
      "An ECS service on Fargate places its tasks in the subnets listed in its network configuration, and the service scheduler spreads tasks across the Availability Zones of those subnets. Running in three Availability Zones with a desired count high enough to keep tasks in each one means the load balancer still has healthy targets when one zone is impaired, and Fargate keeps the company out of EC2 capacity management. A second Region builds a much more expensive multi-Region deployment, and latency-based routing selects a Region on network latency rather than on health. The Amazon EC2 launch type moves back to capacity the company must manage, and a cluster placement group packs instances into a single Availability Zone, which makes the problem worse. Larger tasks and service auto scaling stay inside the same Availability Zone, so a zone failure still takes the whole API down."
  },
  {
    "id": 6,
    "domain": 3,
    "ts": "3.4",
    "q": "A company hosts a global static website in an Amazon S3 bucket. Visitors on every continent must receive the content with the lowest possible latency, and the company wants to reduce the number of requests that reach the S3 origin. Which solution meets these requirements?",
    "options": [
      "Create an Amazon CloudFront distribution with the S3 bucket as the origin, and serve the website through the distribution domain name.",
      "Replicate the bucket into additional AWS Regions and create Amazon Route 53 latency-based records that send each visitor to the closest bucket.",
      "Enable S3 Transfer Acceleration on the bucket and publish the accelerated endpoint to the visitors.",
      "Deploy Amazon EC2 web servers that hold a copy of the website in several AWS Regions, and distribute the traffic with Amazon Route 53 geolocation records."
    ],
    "correct": 0,
    "explanation":
      "CloudFront caches the objects at edge locations near the viewers, which both lowers latency and absorbs repeat requests so they never reach the bucket. Cross-Region replication with latency-based DNS still serves every request from a Regional bucket, so the origin gets no relief and the company pays for several copies of the data. S3 Transfer Acceleration routes uploads to the bucket through the edge network; it does not accelerate downloads to a global audience. Replicating the site onto EC2 fleets adds servers to operate and, with geolocation routing, steers by the requester's location rather than by measured performance."
  },
  {
    "id": 10,
    "domain": 3,
    "ts": "3.5",
    "q": "A microservices application produces an unpredictable volume of messages. The messages must be processed asynchronously, must not be delivered more than once, and must be consumed in the order in which they were sent within each group of related messages. Which solution meets these requirements?",
    "options": [
      "Publish the messages to an Amazon SQS standard queue and deduplicate them in the consumer application.",
      "Publish the messages to an Amazon SQS FIFO queue and set a message group ID on every message.",
      "Publish the messages to an Amazon SNS standard topic and subscribe each consumer application to the topic.",
      "Publish the messages to an Amazon Data Firehose delivery stream and read them from the delivery destination."
    ],
    "correct": 1,
    "explanation":
      "An SQS FIFO queue delivers each message exactly once and preserves the order of messages that share a message group ID, while still absorbing a variable message volume. A standard queue provides at-least-once delivery and best-effort ordering; deduplicating in the consumer removes duplicates but cannot restore ordering. An SNS standard topic is a fan-out mechanism with no ordering or duplicate suppression. Firehose buffers records and writes them to a destination such as Amazon S3; it is a delivery stream, not an ordered work queue."
  },
  {
    "id": 14,
    "domain": 3,
    "ts": "3.3",
    "q": "An application uses a single Amazon RDS for MySQL DB instance for both transactions and analytical reporting. The reporting queries consume most of the DB instance resources and slow the transactions down. The application can be configured to send its read-only queries to a separate endpoint. Which solution meets these requirements?",
    "options": [
      "Convert the DB instance to a Multi-AZ deployment and send the reporting queries to the standby instance.",
      "Modify the DB instance to the next larger instance class and keep a single database endpoint.",
      "Create one or more read replicas of the DB instance and point the reporting queries at a read replica endpoint.",
      "Turn on Amazon RDS Performance Insights and enable the slow query log on the DB instance."
    ],
    "correct": 2,
    "explanation":
      "Read replicas receive an asynchronous copy of the data and serve read-only traffic, so the reporting queries run on their own instance and stop competing with the transactions on the primary. A Multi-AZ standby is not readable and exists for failover, not for read scaling. A larger instance class raises the ceiling for both workloads but they keep contending for the same resources, at a higher cost. Performance Insights and the slow query log show where time is spent; they are diagnostic tools and move no load off the primary."
  },
  {
    "id": 17,
    "domain": 3,
    "ts": "3.2",
    "q": "A company runs a global REST API whose request volume grows rapidly and unpredictably. The company wants the API tier to scale automatically with no servers to provision or patch, and to be charged based on usage. Which solution meets these requirements?",
    "options": [
      "Run the API on Amazon EC2 instances in an Auto Scaling group behind an Application Load Balancer.",
      "Run the API as Amazon ECS tasks on EC2 container instances behind a Network Load Balancer.",
      "Run the API on an Amazon Lightsail instance with a static IP address and a load balancer.",
      "Expose the API through Amazon API Gateway and implement the request handling in AWS Lambda functions."
    ],
    "correct": 3,
    "explanation":
      "API Gateway and Lambda scale with the incoming request rate without any instance to size, and both services charge per request and per invocation duration, which matches unpredictable growth. An Auto Scaling group behind an ALB scales but leaves the company operating, patching, and paying for instances, and it reacts to metrics rather than to each request. ECS on EC2 container instances has the same instance management burden. Lightsail uses fixed-price bundles that must be resized manually."
  },
  {
    "id": 21,
    "domain": 3,
    "ts": "3.3",
    "q": "An application needs a fully managed NoSQL database that sustains millions of requests per second with consistent single-digit millisecond read and write latency and that adapts its capacity automatically as traffic changes. Which solution meets these requirements?",
    "options": [
      "Create an Amazon DynamoDB table in on-demand capacity mode.",
      "Create an Amazon Aurora Serverless v2 DB cluster and store the items in a single table.",
      "Create an Amazon DocumentDB cluster and add read replicas as the load grows.",
      "Create an Amazon Redshift cluster and turn on concurrency scaling."
    ],
    "correct": 0,
    "explanation":
      "DynamoDB is a fully managed key-value and document database designed for consistent single-digit millisecond performance at any scale, and on-demand capacity mode adjusts throughput automatically without provisioning read and write capacity units. Aurora Serverless v2 is a relational engine; it scales compute smoothly but is not a NoSQL store and is not designed for this request rate. DocumentDB is a managed document database, but capacity comes from instances that must be sized and added. Redshift is an analytics data warehouse for large scans and aggregations, not a high-rate operational store."
  },
  {
    "id": 23,
    "domain": 3,
    "ts": "3.4",
    "q": "A real-time multiplayer game exchanges UDP traffic between players and application endpoints deployed in several AWS Regions. The company needs player traffic to reach the closest healthy Regional endpoint over the AWS network and needs failover to another Region to take effect almost immediately. Which solution meets these requirements?",
    "options": [
      "Create an Amazon CloudFront distribution with a Regional load balancer configured as an origin for each Region.",
      "Create an AWS Global Accelerator standard accelerator and add an endpoint group that contains the load balancer of each Region.",
      "Create Amazon Route 53 geolocation records that resolve to the load balancer of each Region.",
      "Create Amazon Route 53 latency-based records with a health check on the load balancer of each Region."
    ],
    "correct": 1,
    "explanation":
      "Global Accelerator gives the game two static anycast IP addresses, admits the traffic at the nearest edge location, carries it over the AWS network to the closest healthy endpoint group, and supports both TCP and UDP. Because the client keeps talking to the same anycast addresses, a Regional failover does not depend on any DNS cache expiring. CloudFront proxies HTTP and HTTPS only, so it cannot carry UDP game traffic. Route 53 geolocation records route by where the request appears to come from rather than by network performance, and both Route 53 options fail over only as fast as resolvers and clients honour the record TTL."
  },
  {
    "id": 27,
    "domain": 3,
    "ts": "3.5",
    "q": "An analytics platform continuously ingests terabytes of clickstream data. Several independent applications must each process the same records in near real time. Which solution meets these requirements?",
    "options": [
      "Send the records to an Amazon SQS standard queue and have every application poll the queue.",
      "Write the records to an Amazon S3 bucket and run scheduled AWS Glue jobs over the new objects.",
      "Send the records to an Amazon Kinesis data stream and register each application as a separate consumer of the stream.",
      "Submit the records to an AWS Batch job queue and process them with array jobs."
    ],
    "correct": 2,
    "explanation":
      "A Kinesis data stream retains records for a configurable period and lets several consumers read the same records independently at their own position in each shard, which is exactly the multi-consumer near-real-time pattern described. In an SQS queue a message is consumed and deleted by one receiver, so several applications cannot each process the same record. Writing to S3 and running scheduled Glue jobs is a batch pattern and does not deliver near-real-time processing. AWS Batch schedules containerized jobs; it is not a streaming ingestion service."
  },
  {
    "id": 31,
    "domain": 3,
    "ts": "3.3",
    "q": "An application has an intermittent and unpredictable relational workload with long idle periods followed by short bursts. The company wants database capacity to adjust automatically and in fine increments, without having to select an instance size. Which solution meets these requirements?",
    "options": [
      "Deploy an Amazon RDS for MySQL DB instance, and enable storage auto scaling so that the database follows the workload without being resized by hand.",
      "Deploy an Amazon RDS for MySQL DB instance, and add read replicas to it during the bursts, removing them again once the burst has ended.",
      "Deploy an Amazon DynamoDB table in on-demand capacity mode so that no instance size has to be chosen, and migrate the application's SQL queries to it.",
      "Deploy an Amazon Aurora Serverless v2 DB cluster and configure a minimum and maximum capacity range in Aurora capacity units."
    ],
    "correct": 3,
    "explanation":
      "Aurora Serverless v2 adjusts the compute capacity of the DB instance in fine increments between the configured minimum and maximum Aurora capacity units, so an idle workload costs little and a burst is absorbed without resizing anything. RDS storage auto scaling grows the storage volume only and does nothing for compute. Adding read replicas is a manual action, adds fixed instances, and does not help the write side of a burst. DynamoDB scales automatically in on-demand mode but is not a relational database."
  },
  {
    "id": 35,
    "domain": 3,
    "ts": "3.3",
    "q": "An ecommerce application reads a product catalog from an Amazon RDS DB instance. The same catalog queries run constantly while the catalog itself changes only a few times per day, and the repeated reads saturate the DB instance. The company wants the repeated queries to stop reaching any database instance. Which solution meets these requirements?",
    "options": [
      "Deploy an Amazon ElastiCache cluster and have the application store and read the catalog query results in the cache.",
      "Create a read replica of the DB instance and send the catalog queries to the read replica endpoint.",
      "Modify the DB instance to a larger instance class with more memory for the buffer pool.",
      "Change the DB instance storage to Provisioned IOPS SSD and raise the provisioned IOPS."
    ],
    "correct": 0,
    "explanation":
      "Caching the catalog results in ElastiCache means that after the first read the application is answered from memory and the query does not reach a database at all until the cached entry expires, which suits data that changes only a few times per day. A read replica still executes every one of those queries on a database instance; it relocates the load instead of removing it. A larger instance class or faster storage raises the capacity available to the same repeated queries and increases cost without eliminating them."
  },
  {
    "id": 38,
    "domain": 3,
    "ts": "3.2",
    "q": "A team is moving a containerized application to AWS. The team does not want to provision, patch, or scale any EC2 instances or container hosts, and wants to pay only for the vCPU and memory that each container requests. Which solution meets these requirements?",
    "options": [
      "Run the containers as Amazon ECS tasks on an Auto Scaling group of EC2 container instances.",
      "Run the containers as Amazon ECS tasks that use the AWS Fargate launch type.",
      "Run the containers on an Amazon EKS cluster with self-managed node groups.",
      "Install a container runtime on Amazon EC2 instances and start the containers from a startup script."
    ],
    "correct": 1,
    "explanation":
      "With the Fargate launch type, AWS provisions and manages the compute for each task, so there is no cluster of instances to patch or scale, and the task is billed for the vCPU and memory it requests. ECS tasks on EC2 container instances and EKS self-managed node groups both leave the team responsible for sizing, patching, and scaling the underlying instances, which are billed whether or not tasks are running. Installing a runtime on EC2 instances by hand is the same instance management with none of the orchestration."
  },
  {
    "id": 41,
    "domain": 3,
    "ts": "3.4",
    "q": "A media company stores video-on-demand files in an Amazon S3 bucket and delivers them to a worldwide audience. The company must cache the videos close to the viewers, keep playback latency low, and make sure that viewers cannot retrieve the objects directly from the bucket. Which solution meets these requirements?",
    "options": [
      "Turn on S3 static website hosting for the bucket and attach a bucket policy that grants public read access to the objects.",
      "Create an Amazon CloudFront distribution with the bucket as the origin, and grant public read access to the bucket so that CloudFront can fetch the objects.",
      "Create an Amazon CloudFront distribution with the bucket as the origin, attach an origin access control (OAC) to the origin, and update the bucket policy so that only the distribution can read the objects.",
      "Create an Amazon CloudFront distribution with the bucket as the origin and attach an AWS WAF web ACL that blocks requests from IP addresses outside the CloudFront edge network."
    ],
    "correct": 2,
    "explanation":
      "CloudFront caches the video segments at edge locations for low playback latency, and an origin access control makes the distribution sign its requests to Amazon S3 so that a bucket policy can restrict reads to that distribution alone. Serving the bucket publicly, with or without a distribution in front, leaves the object URLs reachable directly and defeats the origin protection requirement. An AWS WAF web ACL on the distribution filters requests that already arrived at CloudFront; it cannot stop a viewer from calling the S3 endpoint instead."
  },
  {
    "id": 45,
    "domain": 3,
    "ts": "3.1",
    "q": "A large read-only dataset is refreshed once a day and must be read concurrently, at high aggregate throughput, by hundreds of AWS Lambda functions and Amazon EC2 instances. Which solution meets these requirements?",
    "options": [
      "Include the dataset in the deployment package of each Lambda function and copy it onto every EC2 instance at launch.",
      "Load the dataset into an Amazon RDS DB instance and have every function and instance query it.",
      "Copy the dataset onto an Amazon EBS Provisioned IOPS SSD volume, enable Multi-Attach, and attach the volume to all of the consumers.",
      "Store the dataset as objects in an Amazon S3 bucket and have every function and instance read the objects directly from Amazon S3."
    ],
    "correct": 3,
    "explanation":
      "Amazon S3 supports at least 5,500 GET/HEAD requests per second per partitioned prefix with no limit on the number of prefixes, so hundreds of readers can pull the same objects in parallel, and the daily refresh is a single object replacement that every consumer picks up immediately. Bundling the dataset into deployment packages and machine images means redeploying every consumer each day. A single RDS DB instance becomes the throughput bottleneck the design is trying to avoid. EBS Multi-Attach works only with io1 and io2 volumes, attaches to at most 16 Nitro instances in one Availability Zone, and is not available to Lambda functions at all."
  },
  {
    "id": 301,
    "domain": 3,
    "ts": "3.3",
    "q": "A mobile game stores leaderboards in an Amazon DynamoDB table. At peak hours millions of players read the same few leaderboard items, which causes throttling and high read latency on those items. The company needs microsecond read latency for the cached items and wants to keep using the DynamoDB API without rewriting its queries. Which solution meets these requirements?",
    "options": [
      "Create a DynamoDB Accelerator (DAX) cluster for the table and point the application at the DAX endpoint using the DAX client.",
      "Convert the table into a DynamoDB global table and send the leaderboard reads to a replica table in another AWS Region.",
      "Create a global secondary index on the leaderboard attribute and send the leaderboard reads to the index.",
      "Deploy an Amazon ElastiCache for Memcached cluster and add application code that populates it with the leaderboards."
    ],
    "correct": 0,
    "explanation":
      "DAX is a write-through, in-memory cache built for DynamoDB that returns cached items in microseconds and absorbs repeated reads of the same hot items so they no longer consume table read capacity. The DAX client exposes the same API as DynamoDB, so the existing queries and data model are unchanged and only the client and the endpoint differ. A global table replicates the same partitioning to another Region, so the same few items stay hot there and cross-Region reads add latency. A global secondary index gives a different key structure but the leaderboard items would still be read from a small number of partitions, and index reads consume their own capacity. ElastiCache for Memcached is not integrated with DynamoDB, so the application would have to load, invalidate, and manage the cached leaderboards itself."
  },
  {
    "id": 302,
    "domain": 3,
    "ts": "3.4",
    "q": "A media company delivers live video segments through an Amazon CloudFront distribution to viewers on every continent. The origin builds each segment with just-in-time packaging and is overloaded because CloudFront caching layers in many geographies each request the same segment from it. The company must reduce the number of duplicate requests that reach the origin without changing the packaging application. Which solution meets these requirements?",
    "options": [
      "Raise the minimum TTL of the cache behavior so that the segments stay in the edge caches much longer.",
      "Create a second CloudFront distribution for the same origin and split the viewers between the two distributions with Amazon Route 53 weighted records.",
      "Enable Origin Shield on the distribution's origin, in the AWS Region that has the lowest latency to the origin.",
      "Create an origin group that contains the packaging origin and a secondary origin, and enable origin failover on the cache behavior."
    ],
    "correct": 2,
    "explanation":
      "Origin Shield is an additional caching layer in front of the origin through which all requests from all of CloudFront's caching layers pass, so requests for the same object are consolidated and as few as one request reaches the origin; AWS lists origins that perform just-in-time packaging for live streaming, and viewers spread across geographical regions, as primary use cases. It is a property of the origin and is turned on in the distribution's origin settings, so the packaging application is untouched. Raising the minimum TTL cannot help live segments that are new every few seconds, and each regional caching layer would still fetch a given segment separately. A second distribution multiplies the number of caching layers pulling from the origin instead of reducing them. An origin group provides failover to a backup origin, which addresses availability, not duplicate requests."
  },
  {
    "id": 303,
    "domain": 3,
    "ts": "3.3",
    "q": "A company is building a session and leaderboard service that must return reads in microseconds and acknowledge writes in single-digit milliseconds. The data is the system of record: it must survive the loss of a node or of an Availability Zone without being reloaded from another database. The engineers want to keep the Redis data structures and commands they already use. Which solution meets these requirements?",
    "options": [
      "Deploy an Amazon ElastiCache for Redis OSS replication group with Multi-AZ and automatic failover enabled.",
      "Store the data in an Amazon DynamoDB table and put a DynamoDB Accelerator (DAX) cluster in front of the table.",
      "Deploy a Multi-AZ Amazon RDS for PostgreSQL DB instance and cache the hot keys in an Amazon ElastiCache for Memcached cluster.",
      "Deploy an Amazon MemoryDB cluster and have the application read and write through the cluster endpoint."
    ],
    "correct": 3,
    "explanation":
      "MemoryDB is a durable in-memory database that is compatible with Valkey and Redis OSS: all data is held in memory, which gives microsecond read and single-digit millisecond write latency, and it also stores data durably across multiple Availability Zones using a Multi-AZ transactional log for fast failover, database recovery, and node restarts. That combination is why AWS positions it as a primary database rather than only a cache, which removes the need to run a separate durable store. An ElastiCache replication group with Multi-AZ and automatic failover keeps the cache available, but its replication is asynchronous, so acknowledged writes can be lost when a node fails; ElastiCache is a cache in front of a database, not the system of record. DynamoDB with DAX gives microsecond reads on cached items but its API and data model are not the Redis commands and structures the team uses, and DAX caches reads rather than making the writes faster. RDS with a Memcached cache means two systems to operate, writes go to disk-based storage, and Memcached holds no durable copy."
  },
  {
    "id": 304,
    "domain": 3,
    "ts": "3.2",
    "q": "A high-frequency trading platform runs a tightly coupled compute cluster on Amazon EC2 instances that are all in one Availability Zone. The nodes exchange messages constantly and need the lowest possible network latency and the highest possible throughput between one another. Which solution meets these requirements?",
    "options": [
      "Launch the instances in a spread placement group that covers three separate Availability Zones, with each instance placed on distinct underlying hardware.",
      "Launch the instances in a partition placement group that uses one partition per rack.",
      "Register the instances as targets of an internal Network Load Balancer, and have each one of the nodes communicate with the others through that load balancer.",
      "Launch the instances in a cluster placement group on an instance type that supports Elastic Fabric Adapter, and attach an EFA to each instance."
    ],
    "correct": 3,
    "explanation":
      "A cluster placement group packs the instances close together on the same high-bisection-bandwidth network segment inside one Availability Zone, which is what gives the low latency and high per-flow throughput this workload needs, and an Elastic Fabric Adapter adds an OS-bypass path that lowers and stabilizes latency further for tightly coupled traffic. A spread placement group deliberately puts every instance on distinct hardware, and spreading it over three Availability Zones adds inter-zone latency. A partition placement group isolates groups of instances from each other for replicated data platforms, which again separates rather than packs them. Sending node-to-node traffic through a Network Load Balancer inserts an extra network hop between peers that already reach each other directly."
  },
  {
    "id": 305,
    "domain": 3,
    "ts": "3.2",
    "q": "A web application runs on an Auto Scaling group behind an Application Load Balancer. Traffic rises sharply every business day at 09:00 and falls at 18:00, and unplanned spikes also occur at other times. The company wants capacity to be in place before the daily rise and to be added automatically during the unplanned spikes. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Configure an Auto Scaling lifecycle hook that runs an application warm-up script when an instance launches.",
      "Create a scheduled scaling action that raises the minimum capacity of the group shortly before 09:00 and lowers it after 18:00.",
      "Create a scheduled action that replaces the launch template of the Auto Scaling group every morning.",
      "Create a target tracking scaling policy on the average CPU utilization of the Auto Scaling group.",
      "Set the health check type of the Auto Scaling group to ELB and shorten the health check grace period."
    ],
    "correct": [1, 3],
    "explanation":
      "Scheduled scaling changes the group's capacity at a fixed time, so raising the minimum capacity shortly before 09:00 has the instances registered and passing health checks before the predictable rise arrives. A target tracking policy then keeps average CPU utilization at the configured target, adding instances on its own when an unplanned spike pushes utilization above it. A lifecycle hook can warm an instance up but never adds one. Replacing the launch template changes what future instances look like without changing how many there are. Setting the health check type to ELB and shortening the grace period changes how quickly unhealthy instances are replaced; it does not provision capacity for a spike."
  },
  {
    "id": 306,
    "domain": 3,
    "ts": "3.5",
    "q": "A data team must run ad hoc SQL queries directly against log files in Parquet format that are stored in Amazon S3. The team does not want to provision or manage any infrastructure and wants to pay only for the queries it runs. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Register the files in the AWS Glue Data Catalog and query them in place with Amazon Athena.",
      "Load the files into an Amazon Redshift provisioned cluster with the COPY command and query the cluster.",
      "Create a long-running Amazon EMR cluster with Hive and query the files through the Hive metastore.",
      "Import the files into an Amazon RDS for PostgreSQL DB instance and query the imported tables."
    ],
    "correct": 0,
    "explanation":
      "Athena is serverless: a Glue Data Catalog table describes the Parquet files where they already sit in Amazon S3, and Athena charges for the data each query scans, which the columnar Parquet format keeps small because only the referenced columns are read. A Redshift provisioned cluster runs and bills continuously and requires the data to be loaded first. A long-running EMR cluster bills for every instance hour whether or not queries are running, which is the opposite of paying per query. Loading the logs into an RDS DB instance means an ETL pipeline plus a database instance that runs around the clock."
  },
  {
    "id": 307,
    "domain": 3,
    "ts": "3.1",
    "q": "A file-sharing application needs a shared file system that hundreds of Linux Amazon EC2 instances mount at the same time. The throughput demand is spiky and difficult to forecast, and the company does not want to plan or provision file system capacity or performance. Which solution meets these requirements?",
    "options": [
      "Create a Provisioned IOPS SSD (io2) Amazon EBS volume with Multi-Attach enabled and mount it on all of the instances.",
      "Create an Amazon EFS file system that uses General Purpose performance mode and Elastic throughput, and mount it on all of the instances.",
      "Create an Amazon EFS file system that uses Max I/O performance mode and Bursting throughput, and mount it on all of the instances.",
      "Run an NFS server on an Amazon EC2 instance backed by Throughput Optimized HDD volumes and export the share to the other instances."
    ],
    "correct": 1,
    "explanation":
      "Amazon EFS is a managed NFS file system that a large number of clients can mount concurrently, and Elastic throughput scales throughput up and down automatically for spiky workloads whose requirements are hard to forecast, with nothing to provision. General Purpose performance mode has the lowest per-operation latency and AWS recommends it for all file systems. Max I/O is a previous-generation mode with higher per-operation latency that AWS no longer recommends and that cannot be combined with Elastic throughput, and Bursting throughput ties performance to how much data is stored and to a burst credit balance. EBS Multi-Attach is supported only on io1 and io2 volumes, attaches to at most 16 Nitro-based instances in a single Availability Zone, and standard file systems such as XFS and EXT4 are not designed for simultaneous access by multiple servers. A self-managed NFS server concentrates every mount on one instance, which is both a bottleneck and a single point of failure."
  },
  {
    "id": 308,
    "domain": 3,
    "ts": "3.1",
    "q": "A company is migrating a 500 GB transactional database onto Amazon EC2. The database needs high IOPS and needs its throughput to be configured independently of its IOPS, and the company does not want to buy storage capacity it does not need in order to reach that performance. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Store the database on a General Purpose SSD (gp2) volume that is large enough for its baseline IOPS to reach the required level.",
      "Store the database on a Throughput Optimized HDD (st1) volume.",
      "Store the database on a General Purpose SSD (gp3) volume and provision the required IOPS and throughput on the volume.",
      "Store the database on a Cold HDD (sc1) volume and attach it to an EBS-optimized instance."
    ],
    "correct": 2,
    "explanation":
      "A gp3 volume includes a baseline of 3,000 IOPS and 125 MiB/s at any size, and additional IOPS (up to 80,000) and throughput (up to 2,000 MiB/s) are provisioned separately from capacity, so the volume stays at 500 GB while performance is dialled in. gp3 storage also costs 20 percent less per GiB than gp2. With gp2 the baseline is fixed at 3 IOPS per GiB, so a 500 GB volume delivers about 1,500 IOPS and the only way to raise it is to pay for capacity the database will never use. st1 and sc1 are hard disk drive volumes built for large sequential streaming and are capped at 500 and 250 IOPS per volume respectively, far below what a transactional database needs, and making the instance EBS-optimized does not change the volume's limits."
  },
  {
    "id": 309,
    "domain": 3,
    "ts": "3.5",
    "q": "A payments company streams transaction events into an Amazon Kinesis data stream. The company needs continuous aggregates per merchant over 5-minute tumbling windows, computed by logic the engineers write themselves, with the window state preserved across application restarts and results available within seconds of the events arriving. The company does not want to operate a stream processing cluster. Which solution meets these requirements?",
    "options": [
      "Create an Amazon Data Firehose delivery stream that reads the data stream and writes the events to Amazon S3, then aggregate the objects with Amazon Athena queries.",
      "Create an Amazon Managed Service for Apache Flink application that reads the data stream, computes the windowed aggregates per merchant, and writes the results to the reporting destination.",
      "Subscribe an AWS Lambda function to the data stream and have the function keep the running window totals in the memory of its execution environment.",
      "Load the events into an Amazon Redshift cluster with an Amazon Data Firehose delivery stream and schedule the aggregation queries every 5 minutes."
    ],
    "correct": 1,
    "explanation":
      "Amazon Managed Service for Apache Flink runs Apache Flink applications written in Java, Scala, Python, or SQL against streaming sources, and AWS provides the underlying infrastructure: provisioning compute, Availability Zone failover resilience, parallel computation, automatic scaling, and application backups implemented as checkpoints and snapshots. Windowing and stateful operators are core Flink features, and the checkpoints are what carry the window state across restarts, so the engineers write the aggregation logic and operate no cluster. Firehose buffers records before delivering them and Athena queries the delivered objects afterwards, which is batch analysis rather than continuous windowed aggregation. A Lambda function's execution environment is recycled and is not shared between concurrent invocations, so running totals held in its memory are neither durable nor complete. Loading into Redshift and running scheduled queries adds the delivery buffer plus the query schedule and keeps no streaming state."
  },
  {
    "id": 310,
    "domain": 3,
    "ts": "3.2",
    "q": "A business-critical serverless API built on AWS Lambda behind Amazon API Gateway receives sudden traffic spikes. During the spikes users experience latency caused by cold starts, and some invocations are throttled. Response latency must stay low from the first request of a spike. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Increase the timeout of the Lambda function to the maximum of 15 minutes.",
      "Turn on AWS X-Ray active tracing for the Lambda function and the API stage.",
      "Configure provisioned concurrency on a published version or an alias of the Lambda function.",
      "Attach the Lambda function to a VPC with private subnets in three Availability Zones.",
      "Request an increase of the account's concurrent executions quota in the AWS Region."
    ],
    "correct": [2, 4],
    "explanation":
      "Provisioned concurrency keeps a configured number of execution environments initialized and ready, so requests arriving at the start of a spike are answered without paying the initialization cost of a cold start. Throttling happens when the concurrent executions reach the account quota for the Region, so raising that quota lets the function scale through the spike. A longer timeout only allows a slow invocation to run longer; it does nothing about start-up latency or throttling. X-Ray shows where time is spent but changes no behaviour. Putting the function in a VPC adds nothing here and only matters when the function must reach resources inside that VPC."
  },
  {
    "id": 311,
    "domain": 3,
    "ts": "3.4",
    "q": "A gaming company runs session servers on thousands of Amazon EC2 instances in VPC subnets in one AWS Region. Matchmaking logic assigns each group of players to one specific instance and port, so the entry point must expose a fixed mapping from an address and port to that instance and port, and the UDP traffic of a group must never be sent to another healthy instance. The company also wants player traffic to enter the AWS network as close to the player as possible. Which solution meets these requirements?",
    "options": [
      "Create an AWS Global Accelerator custom routing accelerator with the VPC subnets as endpoints, and give each group of players the accelerator address and listener port that map to the assigned instance and port.",
      "Create an AWS Global Accelerator standard accelerator with an endpoint group that contains a Network Load Balancer placed in front of all of the session servers, and publish the accelerator address to the players.",
      "Create a Network Load Balancer with a UDP listener, register the session servers across every Availability Zone as its targets, and publish the DNS name of the load balancer to every group of players for the client to resolve.",
      "Assign an Elastic IP address to every session server, and have the matchmaking service return the address of the assigned instance to the players."
    ],
    "correct": 0,
    "explanation":
      "A custom routing accelerator exists for exactly this pattern: AWS describes it as a way to use application logic to map users to a specific Amazon EC2 instance among many destinations while still routing the traffic through Global Accelerator. Its endpoints must be VPC subnets, it routes only to EC2 instances in those subnets, it supports UDP and TCP, and its deterministic mapping turns a listener port on the static accelerator addresses into one destination instance and port, which is why AWS names gaming and VoIP sessions as the use cases. A standard accelerator sends traffic to the closest healthy endpoint, so the application cannot pin a group of players to a chosen instance. A Network Load Balancer distributes flows across its targets by hashing, so the instance that receives a flow is the load balancer's choice, and the traffic still crosses the internet to the Region. Elastic IP addresses do reach a chosen instance, but every packet travels over the public internet end to end with no edge entry point, and each server needs its own public address."
  },
  {
    "id": 312,
    "domain": 3,
    "ts": "3.3",
    "q": "An application stores user session data in an in-memory cache. The cache must replicate the data with automatic failover across Availability Zones, must be able to persist its data, and must support data structures such as lists and sorted sets. Which solution meets these requirements?",
    "options": [
      "Create an Amazon ElastiCache for Memcached cluster with nodes spread across several Availability Zones.",
      "Create an Amazon ElastiCache for Redis OSS replication group with Multi-AZ and automatic failover enabled.",
      "Create an Amazon DynamoDB table and enable Time to Live on the session items.",
      "Create a single-node Amazon ElastiCache for Redis OSS cluster and take daily backups of the node."
    ],
    "correct": 1,
    "explanation":
      "A Redis OSS replication group has a primary node and read replicas in other Availability Zones; with Multi-AZ and automatic failover enabled ElastiCache promotes a replica when the primary fails, and the engine offers both snapshotting and the list and sorted set types the application needs. Memcached has no replication and no persistence, and its nodes hold independent partitions rather than copies, so losing a node loses its sessions. DynamoDB with Time to Live expires session items but is a disk-backed database, not an in-memory cache with these data structures. A single-node cluster has nothing to fail over to, and daily backups do not prevent a session outage."
  },
  {
    "id": 313,
    "domain": 3,
    "ts": "3.1",
    "q": "A video processing application writes and reads large temporary files. It needs the highest possible disk throughput and the lowest possible storage latency, and losing the temporary files when the instance stops is acceptable. Which solution meets these requirements?",
    "options": [
      "Store the temporary files on a General Purpose SSD (gp3) volume provisioned with its maximum throughput.",
      "Store the temporary files on an Amazon EFS file system that uses Provisioned throughput.",
      "Store the temporary files on the NVMe instance store volumes of an instance type that includes local storage.",
      "Store the temporary files on a Provisioned IOPS SSD (io2) volume with Multi-Attach enabled."
    ],
    "correct": 2,
    "explanation":
      "Instance store volumes are physically attached to the host that runs the instance, so their I/O avoids the network path that every EBS and EFS request travels, which is what delivers the highest throughput and lowest latency available to an instance. Their contents are lost when the instance stops or terminates, and the workload accepts that. A gp3 volume can be provisioned up to 80,000 IOPS and 2,000 MiB/s but remains network-attached block storage. EFS is a shared NFS file system with read latency of roughly one millisecond, designed for aggregate throughput across many clients rather than minimum latency for one. Enabling Multi-Attach on an io2 volume lets several instances share one network-attached volume, which adds coordination without improving local latency."
  },
  {
    "id": 314,
    "domain": 3,
    "ts": "3.3",
    "q": "An ecommerce application writes to an Amazon DynamoDB table whose partition key is the current date. During sales events every write goes to a single partition key value, the table is throttled, and write latency rises. Which solution meets these requirements?",
    "options": [
      "Raise the provisioned write capacity units on the table to the maximum that the account allows, and request a quota increase for the Region.",
      "Create a DynamoDB Accelerator (DAX) cluster in front of the table so that the application reads and writes through the cluster instead of calling the table directly during a sales event.",
      "Group the writes into BatchWriteItem calls so that fewer requests reach the table and the write load is spread across the partition.",
      "Redesign the key so that writes are spread over many partition key values, either by choosing a high-cardinality attribute or by appending a calculated shard suffix to the date."
    ],
    "correct": 3,
    "explanation":
      "DynamoDB distributes items and throughput by partition key value, so a key that takes one value at a time concentrates every write on one partition regardless of how much capacity the table has. Spreading writes over many key values, by picking a high-cardinality attribute or by appending a shard suffix to the date, is the write sharding pattern that lets the load land on many partitions. Raising write capacity units does not lift the per-partition ceiling and simply costs more. DAX caches reads and is not on the write path. BatchWriteItem groups up to a limited number of items into one request but each item still targets the same partition key value."
  },
  {
    "id": 315,
    "domain": 3,
    "ts": "3.5",
    "q": "A company sends log records to an Amazon Kinesis data stream and must load them into Amazon Redshift for analytics. The records must be buffered and transformed before they are loaded, and the company does not want to write or operate a consumer application. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Create an Amazon Data Firehose delivery stream that reads the data stream, transforms the records with an AWS Lambda function, and uses Amazon Redshift as its destination.",
      "Build a Kinesis Client Library application on Amazon EC2 instances in an Auto Scaling group that reads the stream, transforms the records, and loads them into Amazon Redshift.",
      "Subscribe an AWS Lambda function to the data stream and have the function accumulate batches in Amazon S3 and issue COPY commands against Amazon Redshift.",
      "Schedule AWS Glue Spark jobs that read the data stream, transform the records, and write them into Amazon Redshift."
    ],
    "correct": 0,
    "explanation":
      "Firehose is a fully managed delivery service: it reads the data stream, buffers records by size or by time, can call a Lambda function to transform them, and for its Amazon Redshift destination it stages the data in Amazon S3 and issues the COPY command itself. There is nothing to scale or operate. A Kinesis Client Library application means writing consumer code and running the instances that host it. A Lambda consumer works but the batching, staging, COPY orchestration, retries, and failure handling all become application code. Glue Spark jobs are a batch ETL tool with jobs and schedules to maintain, which is more overhead than a delivery stream, not less."
  },
  {
    "id": 316,
    "domain": 3,
    "ts": "3.5",
    "q": "A company runs large Apache Spark and Apache Hive jobs intermittently. The company wants a managed cluster that installs and configures the frameworks, scales its capacity with the running job, and uses Amazon EC2 Spot Instances to lower the cost of the intermittent runs. Which solution meets these requirements?",
    "options": [
      "Query the data with Amazon Athena and start the queries on a schedule with Amazon EventBridge.",
      "Create an Amazon EMR cluster with managed scaling and a task instance fleet that uses Spot Instances.",
      "Run the jobs in AWS Lambda functions that are invoked by Amazon S3 event notifications.",
      "Query the data with Amazon Redshift Spectrum from an Amazon Redshift provisioned cluster."
    ],
    "correct": 1,
    "explanation":
      "Amazon EMR provisions the cluster with Spark and Hive already installed and configured, managed scaling adds and removes capacity while a job runs, and a task instance fleet can be filled with Spot Instances so the intermittent heavy work costs a fraction of On-Demand. Athena runs SQL over data in Amazon S3 and does not execute Spark or Hive job code. Lambda functions are bounded in execution time and resources and are not a Spark runtime. Redshift Spectrum extends Redshift SQL to data in Amazon S3; it does not run Spark or Hive jobs, and the Redshift cluster itself runs continuously."
  },
  {
    "id": 317,
    "domain": 3,
    "ts": "3.5",
    "q": "A monolithic application processes orders synchronously: placing an order waits for the payment, inventory, and shipping steps to complete before it returns. Throughput collapses during traffic spikes. How should a solutions architect redesign the architecture to raise throughput and let each processing step scale on its own?",
    "options": [
      "Move the monolith to a larger Amazon EC2 instance type with more vCPUs, more memory, and a larger network allowance, and enlarge its request thread pool so that more orders are processed at the same time.",
      "Run several copies of the monolith behind an Application Load Balancer, and enable sticky sessions so that each client keeps using the same copy of the monolith for the whole of its order.",
      "Have the order endpoint publish an order message to an Amazon SQS queue, and process payment, inventory, and shipping in separate worker fleets that scale on the queue depth.",
      "Move the monolith unchanged to AWS Fargate tasks running behind an Application Load Balancer, and raise the desired count of the service so that more tasks accept orders during a spike."
    ],
    "correct": 2,
    "explanation":
      "Putting a queue between the order endpoint and the processing steps makes the request return as soon as the message is durably stored, and each worker fleet consumes at its own rate and scales on its own backlog, so a spike lengthens the queue instead of failing requests. A larger instance raises one ceiling and keeps every step in the same synchronous call. Running more copies of the monolith behind a load balancer scales all steps together and sticky sessions concentrate work on specific instances. Moving the same monolith to Fargate changes where it runs but keeps the synchronous coupling and scales all the steps as one unit."
  },
  {
    "id": 318,
    "domain": 3,
    "ts": "3.1",
    "q": "An application must upload very large files to Amazon S3 from clients spread around the world, as quickly and as reliably as possible. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Upload the files with multipart upload so that parts travel in parallel and a failed part can be retried on its own.",
      "Compress each file on the client and send it in a single PutObject request.",
      "Configure an S3 Lifecycle rule that aborts incomplete multipart uploads after 7 days.",
      "Enable S3 Transfer Acceleration on the bucket and have the clients upload to the accelerated endpoint.",
      "Have each client request a presigned URL from the application before it starts an upload."
    ],
    "correct": [0, 3],
    "explanation":
      "Multipart upload splits an object into parts that are sent in parallel over separate connections, and a part that fails is retried by itself instead of restarting the whole transfer, which is what makes very large uploads both fast and resilient. Transfer Acceleration routes the upload into the nearest CloudFront edge location and then over the AWS network to the bucket, which is where the gain comes from when clients are far from the bucket's Region. A single compressed PutObject is one long connection with no parallelism and no partial retry. The lifecycle rule for incomplete multipart uploads is good hygiene that stops abandoned parts from accruing storage charges, but it changes no transfer speed. Presigned URLs control who may upload; they do not affect how fast the bytes travel."
  },
  {
    "id": 319,
    "domain": 3,
    "ts": "3.3",
    "q": "A relational database is reaching its read scalability limits. The company wants a managed MySQL-compatible and PostgreSQL-compatible database in which up to 15 read-only instances read the same underlying storage volume as the writer, with very low replica lag. Which solution meets these requirements?",
    "options": [
      "Deploy an Amazon RDS for MySQL DB instance and create several read replicas of it.",
      "Deploy an Amazon DynamoDB table in on-demand capacity mode and migrate the data to it.",
      "Deploy an Amazon Redshift cluster and load the data from the current database into it.",
      "Deploy an Amazon Aurora DB cluster and add Aurora Replicas to it."
    ],
    "correct": 3,
    "explanation":
      "An Aurora DB cluster separates compute from a shared distributed storage volume, and up to 15 Aurora Replicas read that same volume instead of replaying a replication stream, which is why replica lag stays very low; the cluster's reader endpoint balances read connections across them. RDS read replicas each hold their own copy of the data and apply changes through engine-level replication, so each replica stores the data again and lag depends on how fast it can apply the stream. DynamoDB is a NoSQL service and is not MySQL or PostgreSQL compatible. Redshift is an analytics data warehouse, not a transactional database."
  },
  {
    "id": 320,
    "domain": 3,
    "ts": "3.2",
    "q": "A web application runs on Amazon EC2 instances in an Auto Scaling group. Each instance writes a large dataset to disk at boot and needs about 12 minutes before it can serve traffic. Traffic spikes arrive without warning and follow no repeating pattern, so instances launched by a scaling policy become useful long after the spike. The company needs capacity added by a scale-out event to start serving traffic in far less time than a cold launch takes, while keeping the cost of the capacity held in reserve low. Which solution meets these requirements?",
    "options": [
      "Enable predictive scaling on the Auto Scaling group so that the capacity is added ahead of each spike.",
      "Create a target tracking scaling policy on the average CPU utilization of the group, and lower its target value so that the instances are launched earlier in a spike and have time to initialize.",
      "Raise the minimum capacity of the Auto Scaling group so that enough fully initialized instances are running at all times.",
      "Add a warm pool to the Auto Scaling group that keeps pre-initialized instances in the Stopped state, and use a lifecycle hook so that instances finish initializing before they enter the pool."
    ],
    "correct": 3,
    "explanation":
      "A warm pool is a pool of pre-initialized EC2 instances that sits alongside the Auto Scaling group; on a scale-out event the group draws on the pool to meet its new desired capacity, which is precisely the feature AWS documents for applications with exceptionally long boot times, such as instances that must write massive amounts of data to disk. Keeping the pooled instances in the Stopped state minimizes cost, because stopped instances are charged only for the volumes they use and for any Elastic IP addresses attached to them. The lifecycle hook is required: without one, Amazon EC2 Auto Scaling stops instances as they enter the warm pool without waiting for user data to finish, so an instance could be put in service before it is ready. Predictive scaling forecasts capacity from recurring load patterns, which this unpredictable traffic does not provide. A more aggressive target tracking policy launches instances sooner but each one still needs its full initialization time. Raising the minimum capacity works but pays the full price of running instances that are idle between spikes."
  },
  {
    "id": 321,
    "domain": 3,
    "ts": "3.4",
    "q": "A news site serves pages that are personalized for each signed-in user, alongside a large volume of static CSS, JavaScript, and image assets. The company wants to reduce overall latency and the load on the origin while keeping the personalized pages correct for each user. Which solution meets these requirements?",
    "options": [
      "Create one cache behavior for the whole site that forwards all cookies and headers to the origin, so that every response is built for the user who requested it.",
      "Create separate cache behaviors by path pattern: a long TTL with a cache policy that excludes cookies for the static assets, and a short TTL with a cache policy that includes the session cookie in the cache key for the personalized pages.",
      "Create one cache behavior for the whole site with a long TTL that applies to every path, and invalidate the distribution whenever the personalized content of any user changes so that the next request for that page is rebuilt at the origin and cached again.",
      "Serve only the static assets through CloudFront with a long TTL, and let browsers request the personalized pages from the origin directly over a separate hostname."
    ],
    "correct": 1,
    "explanation":
      "Cache behaviors are matched by path pattern, so the static assets can use a cache key that ignores cookies and a long TTL, which gives a high cache hit ratio and keeps those requests off the origin. The personalized paths need the session cookie in the cache key, which is what a cache policy does: each signed-in user then gets a separate cached object, and a short TTL keeps the page fresh. Values that are only in an origin request policy are forwarded to the origin but are excluded from the cache key, so a cached personalized page would be served to the wrong user. Forwarding all cookies and headers on a single behavior makes the cache key nearly unique per request, so almost nothing is cached and the origin still handles everything. A single long TTL over the whole site would serve one user's personalized page to another. Bypassing CloudFront for the personalized pages gives up the persistent edge connection and sends that traffic straight to the origin."
  },
  {
    "id": 322,
    "domain": 3,
    "ts": "3.1",
    "q": "A scientific computing team runs an HPC workload on Amazon EC2 that requires a Lustre-compatible parallel file system whose performance scales with the size of the file system. The input data is stored in an Amazon S3 bucket and the results must be written back to that bucket. Which solution meets these requirements?",
    "options": [
      "Create an Amazon EFS file system in Max I/O performance mode and copy the S3 objects into it before each run.",
      "Create an Amazon FSx for Windows File Server file system and mount the SMB share on the compute instances.",
      "Create an Amazon FSx for Lustre file system and link it to the S3 bucket with a data repository association.",
      "Create a Provisioned IOPS SSD (io2) Amazon EBS volume for each instance and copy the S3 objects onto every volume."
    ],
    "correct": 2,
    "explanation":
      "FSx for Lustre is a managed Lustre file system whose performance scales as the file system grows, because data is striped across many file servers and storage targets and each client reads from all of them in parallel. A data repository association links the file system to the S3 bucket so objects are imported as files and results are exported back as objects. Amazon EFS speaks NFS, not Lustre, and Max I/O is a previous-generation performance mode with higher per-operation latency that AWS no longer recommends. FSx for Windows File Server serves SMB shares for Windows workloads. Per-instance EBS volumes are not a shared file system at all, and copying the dataset onto each one duplicates the data and the transfer."
  },
  {
    "id": 323,
    "domain": 3,
    "ts": "3.3",
    "q": "A company stores terabytes of structured analytical data and runs complex aggregation queries across long historical ranges. The company wants columnar storage and massively parallel query execution for these queries. Which solution meets these requirements?",
    "options": [
      "Store the data in an Amazon RDS for PostgreSQL DB instance and add indexes for the aggregation columns.",
      "Store the data in an Amazon DynamoDB table and compute the aggregations with parallel Scan operations.",
      "Store the data in an Amazon ElastiCache for Redis cluster and aggregate the values in the application.",
      "Load the data into an Amazon Redshift cluster and run the aggregations as SQL queries."
    ],
    "correct": 3,
    "explanation":
      "Redshift stores data by column and distributes both the data and the query execution across the slices of the cluster, so an aggregation over a long history reads only the referenced columns and runs in parallel on every slice. RDS for PostgreSQL stores rows and executes a query on one instance, so indexes help selective lookups but not full-history aggregations over terabytes. DynamoDB is designed for key-based access; parallel Scan reads the whole table and computes nothing itself. ElastiCache is an in-memory cache with no analytical query engine, and the aggregation would have to be written by hand in the application."
  },
  {
    "id": 324,
    "domain": 3,
    "ts": "3.2",
    "q": "An Amazon EC2 instance runs a network-intensive application that sends a very high rate of small packets, and the instance is not reaching the expected network performance. The company wants to maximize the instance's throughput and packets-per-second rate. What should a solutions architect do to accomplish this?",
    "options": [
      "Use an instance type that supports enhanced networking with the Elastic Network Adapter and confirm that the ENA driver is enabled on the instance.",
      "Associate several additional Elastic IP addresses with the primary network interface of the running instance, one address for each application that runs on it.",
      "Attach several secondary elastic network interfaces to the instance, and spread the outbound packets of the application evenly across all of those interfaces.",
      "Move the root volume of the instance to a Provisioned IOPS SSD (io2) volume with a high provisioned IOPS value, sized for the application's read and write pattern."
    ],
    "correct": 0,
    "explanation":
      "Enhanced networking uses single root I/O virtualization to give the instance a direct path to the network device, which raises packets-per-second rates and bandwidth and lowers and stabilizes latency compared with the standard virtualized interface. It requires a supported instance type and the ENA driver present and enabled. Elastic IP addresses change how the instance is reached from the internet and have no effect on its network performance. Additional network interfaces do not raise the aggregate bandwidth of an instance, which is determined by the instance type and size. Faster block storage improves disk I/O and leaves the network path unchanged."
  },
  {
    "id": 325,
    "domain": 3,
    "ts": "3.3",
    "q": "An application reads the same Amazon DynamoDB items repeatedly. The company wants to lower the latency of those repeated reads and reduce the read capacity they consume, while a small number of critical operations must still perform strongly consistent reads. Which approach will meet these requirements?",
    "options": [
      "Route every read, including the strongly consistent ones, through a DAX cluster so that all of the reads are served from the cache in memory and none of them ever reaches the table itself.",
      "Route the repeated reads through a DAX cluster as eventually consistent reads, and issue the critical operations with ConsistentRead set to true, which DAX passes through to DynamoDB.",
      "Replace DynamoDB with an Amazon ElastiCache for Redis cluster, and serve all of the reads from that cache.",
      "Enable Amazon API Gateway stage caching with a defined TTL in front of the DynamoDB read operations, and serve the critical strongly consistent reads for the affected route from that cache."
    ],
    "correct": 1,
    "explanation":
      "DAX caches eventually consistent GetItem, Query, and Scan results, which serves the repeated reads from memory and removes them from the table's consumed read capacity. When a request sets ConsistentRead to true, DAX forwards it to DynamoDB and returns the response without caching it, because DAX cannot guarantee strong consistency on its own, so the critical operations stay strongly consistent through the same client. Routing every read through DAX does not make the strongly consistent ones faster, since they bypass the cache by design. Replacing DynamoDB with Redis abandons the strongly consistent reads entirely and moves the source of truth into a cache. An API Gateway stage cache returns a stored response for the duration of its TTL, which is by definition not a strongly consistent read."
  },
  {
    "id": 326,
    "domain": 3,
    "ts": "3.3",
    "q": "An application needs the simplest possible in-memory cache for ephemeral, non-critical data. The cache must scale out by adding nodes and must make use of all of the CPU cores of each node. Persistence, replication, and advanced data structures are not required. Which solution meets these requirements?",
    "options": [
      "Create an Amazon ElastiCache for Redis OSS replication group with cluster mode and append-only file persistence enabled.",
      "Create an Amazon DynamoDB table and put a DynamoDB Accelerator (DAX) cluster in front of it.",
      "Create an Amazon ElastiCache for Memcached cluster and add nodes as the working set grows.",
      "Create an Amazon MemoryDB cluster and store the cached values in it."
    ],
    "correct": 2,
    "explanation":
      "Memcached is a multithreaded engine, so a node uses all of its cores, and an ElastiCache for Memcached cluster grows by adding nodes that the client shards its keys across. It offers no persistence and no replication, which is exactly what this workload does not need. A Redis OSS replication group with cluster mode and append-only file persistence adds the replication and durability features the requirement rules out, and Redis OSS is not multithreaded for command execution. DAX caches items from a DynamoDB table and is not a general-purpose cache for arbitrary application data. MemoryDB is a durable Multi-AZ in-memory database, which is heavier and more costly than a throwaway cache."
  },
  {
    "id": 327,
    "domain": 3,
    "ts": "3.3",
    "q": "An Amazon DynamoDB table stores orders with customer_id as the partition key and order_date as the sort key. A new feature must retrieve all orders for a given product_id, an attribute that is not part of the primary key. Scanning the whole table is too slow and too expensive. Which solution meets these requirements?",
    "options": [
      "Create a local secondary index that uses product_id as its sort key.",
      "Run parallel Scan operations with a filter expression on product_id.",
      "Create a second table keyed on product_id and have the application write every order to both tables.",
      "Create a global secondary index that uses product_id as its partition key."
    ],
    "correct": 3,
    "explanation":
      "A global secondary index has its own partition key, so with product_id as that key the feature issues a Query that reads only the matching items and DynamoDB keeps the index up to date automatically. A local secondary index must keep the table's partition key, customer_id, and can change only the sort key, so any query against it still has to supply a customer_id. A filter expression is applied after the Scan has read the items, so the full read cost and the full latency of a table scan remain. Writing every order to a second table duplicates each write in application code and leaves the two tables to diverge whenever one of the writes fails."
  },
  {
    "id": 328,
    "domain": 3,
    "ts": "3.2",
    "q": "A REST API on Amazon API Gateway serves a product catalog whose responses change at most every few minutes. Identical GET requests keep invoking the backend AWS Lambda function and its database, which are heavily loaded as a result. The company wants to reduce backend load and response latency. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Provision a cache for the API stage and turn on method-level caching for the GET methods with a suitable TTL.",
      "Increase the timeout and the memory allocation of the backend Lambda function.",
      "Create a usage plan with API keys and throttle the clients that call the API most often.",
      "Turn on AWS X-Ray active tracing for the API stage and for the Lambda function."
    ],
    "correct": 0,
    "explanation":
      "When a cache is provisioned on a stage, API Gateway keeps the integration response for a time to live and answers subsequent identical requests from that cache without calling the backend at all. The default TTL is 300 seconds and the maximum is 3,600 seconds, and only GET methods are cached by default, which fits a catalog that changes every few minutes. No application code changes. A bigger or longer-running Lambda function still runs on every request. A usage plan with throttling protects the backend by rejecting requests rather than by serving them faster. X-Ray shows where the time goes and changes nothing about it."
  },
  {
    "id": 329,
    "domain": 3,
    "ts": "3.3",
    "q": "An Amazon Aurora MySQL DB cluster has one writer and three Aurora Replicas. The reporting applications are configured with the instance endpoint of a single replica, so the other two replicas stay idle. The read traffic must be spread across all of the replicas and must keep working when replicas are added, removed, or promoted. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Create a Network Load Balancer, register the three replica instances as targets, and point the reporting applications at the load balancer.",
      "Point the reporting applications at the reader endpoint of the DB cluster.",
      "Implement client-side round-robin across the three instance endpoints in each reporting application.",
      "Create an Aurora custom endpoint for each replica and assign one endpoint to each reporting application."
    ],
    "correct": 1,
    "explanation":
      "The reader endpoint of an Aurora cluster performs connection balancing across all of the available Aurora Replicas and follows the cluster's membership, including after a replica is added, removed, or promoted during a failover. Adopting it is a connection string change and nothing else. A Network Load Balancer in front of the DB instances means keeping target registrations in step with the cluster by hand. Client-side round-robin puts that same membership tracking into every application. Custom endpoints do group instances, but assigning one per replica statically pins each application to a single instance, which recreates the problem the company is trying to solve."
  },
  {
    "id": 330,
    "domain": 3,
    "ts": "3.1",
    "q": "A data lake application issues a very high rate of GET requests against a single Amazon S3 bucket in which every object is stored under one key prefix. During peaks the application starts receiving 503 Slow Down responses. Which solution will scale the request throughput?",
    "options": [
      "Enable S3 Versioning on the bucket that holds the data lake, and keep every noncurrent version stored in S3 Standard indefinitely.",
      "Recreate the bucket in an AWS Region with more Availability Zones, then copy every object into the new bucket.",
      "Spread the objects across many key prefixes and issue the requests in parallel across those prefixes.",
      "Consolidate the objects into a small number of large archive files, and read the byte ranges out of them."
    ],
    "correct": 2,
    "explanation":
      "Amazon S3 scales request rate per partitioned prefix: an application can achieve at least 3,500 PUT/COPY/POST/DELETE or 5,500 GET/HEAD requests per second per prefix, and there is no limit on the number of prefixes in a bucket, so ten prefixes read in parallel scale reads to about 55,000 requests per second. The 503 Slow Down responses appear while S3 scales up to a higher request rate and dissipate once that scaling completes, which is a signal to parallelize across prefixes. Versioning stores additional object versions and does not change any request rate. The Region has no bearing on the per-prefix rate. Merging the objects into a few large files concentrates every request on even fewer keys, which makes the problem worse."
  },
  {
    "id": 331,
    "domain": 3,
    "ts": "3.2",
    "q": "An AWS Lambda function that resizes images is CPU bound and takes about 12 seconds per invocation with 512 MB of memory configured. The function code is already optimized, and the company needs each invocation to complete significantly faster. Which solution meets these requirements?",
    "options": [
      "Reduce the memory configured for the function to 128 MB, the lowest setting available, so that more environments can run concurrently.",
      "Increase the function timeout so that every invocation has enough time to finish.",
      "Change the function's event source from Amazon S3 to Amazon SQS and process the images in batches.",
      "Increase the memory configured for the function, which increases the CPU allocated to it in proportion."
    ],
    "correct": 3,
    "explanation":
      "Lambda allocates CPU power in proportion to the memory configured for a function, and a function reaches the equivalent of one vCPU at 1,769 MB. A CPU-bound function running at 512 MB therefore has well under a full vCPU, and raising the memory setting shortens the run directly; because Lambda bills on duration and memory together, a much faster run at higher memory can even cost the same or less. Lowering the memory to 128 MB, the minimum, cuts the CPU allocation further and makes the function slower. A longer timeout permits a slow invocation without accelerating it. Changing the event source alters how invocations are triggered and batched, not how fast the CPU work runs."
  },
  {
    "id": 332,
    "domain": 3,
    "ts": "3.1",
    "q": "A company must migrate 80 TB from an on-premises NFS array to Amazon S3 over an existing dedicated 10 Gbps link. The transfer must run incrementally, verify the integrity of the transferred data, respect a bandwidth limit, and be configured and monitored from AWS. Which solution meets these requirements?",
    "options": [
      "Deploy an AWS DataSync agent on premises and create a DataSync task from the NFS share to the S3 bucket.",
      "Order AWS Snowball Edge devices, copy the data onto them on premises, and ship them back to AWS.",
      "Run the AWS CLI s3 sync command from an on-premises server against the S3 Transfer Acceleration endpoint.",
      "Create an AWS Database Migration Service replication instance and a migration task with the NFS array as the source."
    ],
    "correct": 0,
    "explanation":
      "DataSync moves data from NFS, SMB, HDFS, and object storage into Amazon S3, Amazon EFS, and Amazon FSx using a purpose-built protocol with a parallel multi-threaded architecture, and it applies encryption and data integrity validation end to end. The task, its schedule, its bandwidth limit, and its incremental behaviour are all defined and monitored in AWS, and only the agent runs on premises. Snowball is the offline path for cases where the network cannot carry the data, which does not apply to a dedicated 10 Gbps link; it is also no longer available to new customers, who are directed to AWS DataSync, AWS Data Transfer Terminal, or AWS Partner solutions. The AWS CLI over the accelerated endpoint copies objects but offers no managed task, no scheduling, no integrity reporting, and no bandwidth control. DMS migrates database engines, not file shares."
  },
  {
    "id": 333,
    "domain": 3,
    "ts": "3.1",
    "q": "A research lab must move 600 TB of data into Amazon S3 within three weeks. The lab's internet uplink is 200 Mbps and cannot be upgraded. Which solution meets these requirements?",
    "options": [
      "Transfer the data over the existing link with S3 Transfer Acceleration and multipart uploads, running the uploads continuously for the full three weeks.",
      "Order several AWS Snowball Edge Storage Optimized devices, copy the data onto them locally, and ship them to AWS for import into Amazon S3.",
      "Deploy an AWS DataSync agent, and run a scheduled DataSync task over the existing 200 Mbps internet link every night until the transfer completes.",
      "Compress the data on premises, and upload it with the AWS CLI using many parallel threads that keep the 200 Mbps uplink saturated around the clock for three weeks."
    ],
    "correct": 1,
    "explanation":
      "A fully saturated 200 Mbps link carries roughly 2 TB per day, so 600 TB would take well over eight months and no online technique can meet a three-week deadline. Snowball Edge Storage Optimized devices provide 210 TB of usable storage each, so a handful of devices covers the dataset; they are filled locally at local network speed, shipped to AWS, and the data is imported into Amazon S3 on arrival. Transfer Acceleration, DataSync, and parallel compressed CLI uploads are all genuine ways to speed up an online transfer, but each one remains bounded by the same 200 Mbps uplink. Note that AWS Snowball Edge is no longer available to new customers, which AWS now directs to AWS DataSync, AWS Data Transfer Terminal, or AWS Partner solutions; the offline-transfer reasoning tested here is unchanged and Snowball remains the answer the exam expects."
  },
  {
    "id": 334,
    "domain": 3,
    "ts": "3.1",
    "q": "A mission-critical SAP database on Amazon EC2 requires up to 200,000 IOPS from a single Amazon EBS volume, consistently sub-millisecond I/O latency, and 99.999 percent volume durability. Which solution meets these requirements?",
    "options": [
      "Attach a General Purpose SSD (gp3) volume provisioned with its maximum IOPS.",
      "Attach a Throughput Optimized HDD (st1) volume at its maximum size.",
      "Attach a Provisioned IOPS SSD io2 Block Express volume provisioned with 200,000 IOPS.",
      "Attach a General Purpose SSD (gp2) volume of 16 TiB."
    ],
    "correct": 2,
    "explanation":
      "io2 Block Express volumes support up to 256,000 IOPS and 4,000 MiB/s per volume on Nitro-based instances, are designed to deliver an average latency under 500 microseconds for 16 KiB I/O operations, and are the only EBS volume type designed for 99.999 percent durability, so they satisfy all three requirements at once. A gp3 volume tops out at 80,000 provisioned IOPS and is designed for 99.8 to 99.9 percent durability. A gp2 volume provides 3 IOPS per GiB and reaches its ceiling of 16,000 IOPS at 5,334 GiB, so a 16 TiB volume is nowhere near 200,000 IOPS and has the same durability design point as gp3. st1 is a hard disk drive volume limited to 500 IOPS and intended for large sequential streaming."
  },
  {
    "id": 335,
    "domain": 3,
    "ts": "3.5",
    "q": "Five independent applications consume the same Amazon Kinesis data stream. Latency keeps growing because the consumers share each shard's read throughput and compete with one another when polling with GetRecords. Each consumer must receive its own dedicated read throughput and have records pushed to it with a low propagation delay. Which solution meets these requirements?",
    "options": [
      "Reduce the number of shards in the stream so that each consumer polls fewer shards.",
      "Increase the interval between the GetRecords calls of each consumer application.",
      "Replace the data stream with an Amazon SQS standard queue and have each application poll the queue.",
      "Register each application as an enhanced fan-out consumer and read the shards with SubscribeToShard."
    ],
    "correct": 3,
    "explanation":
      "Shared-throughput consumers split a fixed total of 2 MB/s of read throughput per shard, and the average message propagation delay rises from around 200 ms with one consumer to around 1,000 ms with five. A consumer registered for enhanced fan-out receives its own read throughput of up to 2 MB/s per shard independently of the other consumers, and Kinesis Data Streams pushes records to it over HTTP/2 through SubscribeToShard with an average propagation delay of about 70 ms whether one or five consumers are registered. Reducing the shard count lowers the total throughput of the stream. Polling less often only adds delay. An SQS queue hands each message to a single receiver, so five applications cannot each process the same records."
  },
  {
    "id": 336,
    "domain": 3,
    "ts": "3.4",
    "q": "A website delivered through Amazon CloudFront must rewrite the request URI and add a security header on every viewer request and response. The logic is a few lines of JavaScript, makes no network calls, and must run at very large scale with the lowest possible added latency and cost. Which solution meets these requirements?",
    "options": [
      "Associate a CloudFront function with the viewer request and viewer response events of the cache behavior.",
      "Associate a Lambda@Edge function with the viewer request and viewer response events of the cache behavior.",
      "Associate a Lambda@Edge function with the origin request and origin response events of the cache behavior.",
      "Add header rewrite rules to an Application Load Balancer placed between CloudFront and the origin."
    ],
    "correct": 0,
    "explanation":
      "CloudFront Functions run JavaScript at CloudFront edge locations on viewer request and viewer response events; AWS states that the runtime environment offers submillisecond startup times and scales immediately to handle millions of requests per second, and manipulating requests and responses is exactly what the feature is for. They also cost considerably less per invocation than Lambda@Edge. Lambda@Edge on viewer events would also work, but it exists for functions that take longer to run, need adjustable CPU and memory, third-party libraries, network access, or the request body, and its documented quota is 10,000 requests per second in each supported AWS Region. Lambda@Edge on origin events runs only when CloudFront goes to the origin, so requests served from the cache would never get the header or the rewrite. An Application Load Balancer between CloudFront and the origin is likewise reached only on a cache miss and is not edge execution."
  },
  {
    "id": 337,
    "domain": 3,
    "ts": "3.5",
    "q": "A company centralizes its application logs and needs full-text search across terabytes of log data, indexing of new entries within seconds of their arrival, and interactive dashboards for the operations team. Which solution meets these requirements?",
    "options": [
      "Store the logs in an Amazon RDS for MySQL DB instance and search them with LIKE predicates.",
      "Stream the logs into an Amazon OpenSearch Service domain and build the dashboards in OpenSearch Dashboards.",
      "Store the logs as objects in Amazon S3 and search them one object at a time with S3 Select.",
      "Query the logs with Amazon Athena and visualize the results in Amazon QuickSight."
    ],
    "correct": 1,
    "explanation":
      "OpenSearch Service maintains an inverted index over the ingested documents, so full-text queries across terabytes return quickly, newly ingested entries become searchable within seconds, and every domain includes OpenSearch Dashboards for the interactive exploration the operations team needs. LIKE predicates on a relational database force a scan of every row and offer no tokenization or relevance ranking at this volume. S3 Select reads within a single object and builds no index across the dataset. Athena with QuickSight is a sound analytics pairing, but each query scans the files again with no full-text index and no near-real-time indexing of arriving log entries."
  },
  {
    "id": 338,
    "domain": 3,
    "ts": "3.3",
    "q": "A social network feature must answer questions such as which friends of a user's friends follow the same pages, over billions of highly connected relationships, with millisecond latency. Multi-table relational JOINs have become far too slow. Which solution meets these requirements?",
    "options": [
      "Load the relationships into an Amazon Redshift cluster and express the traversals as recursive SQL queries.",
      "Store the relationships in an Amazon DynamoDB table with a global secondary index on the related identifier.",
      "Store the relationships in an Amazon Neptune database and query them with Gremlin or openCypher.",
      "Store the relationships in an Amazon ElastiCache for Redis OSS cluster as sets of related identifiers."
    ],
    "correct": 2,
    "explanation":
      "Neptune is a purpose-built graph database whose storage and query engine are optimized for navigating relationships, and its Gremlin and openCypher interfaces express multi-hop traversals such as friends of friends directly, returning results in milliseconds over billions of relationships. Redshift is a columnar analytics warehouse built for scans and aggregations, so recursive SQL over billions of edges reproduces exactly the JOIN cost the company is trying to escape. DynamoDB with a global secondary index resolves one hop per query, so a multi-hop traversal becomes a chain of round trips whose latency compounds. Redis sets can hold adjacency lists, but the traversal, the intersections, and the depth control all move into application code and into repeated network round trips."
  },
  {
    "id": 339,
    "domain": 3,
    "ts": "3.1",
    "q": "A company is migrating an on-premises NetApp storage environment to AWS. A fleet of Linux application servers mounts the datasets over NFS, and a reporting tool running on Windows servers reads the same datasets over SMB. The storage team wants to keep using NetApp snapshot, cloning, and replication tooling, and wants infrequently accessed data moved automatically to a lower-cost storage tier without changing the mount paths. Which solution meets these requirements?",
    "options": [
      "Create an Amazon EFS file system and mount it from the Linux servers, and run a nightly copy job to an Amazon S3 bucket for the Windows reporting tool.",
      "Create an Amazon FSx for Windows File Server file system and expose the datasets to the Linux servers through an SMB client.",
      "Create an Amazon FSx for NetApp ONTAP file system and expose the volumes to the Linux servers over NFS and to the Windows servers over SMB.",
      "Create an Amazon FSx for Lustre file system linked to an Amazon S3 bucket and mount it from both the Linux and the Windows servers."
    ],
    "correct": 2,
    "explanation":
      "FSx for NetApp ONTAP is the only AWS file system built on ONTAP itself: it serves the same volume over NFS, SMB, and iSCSI, keeps NetApp snapshots, FlexClone, and SnapMirror replication, and automatically tiers infrequently accessed data to a capacity pool. EFS speaks NFS only, so the Windows reporting tool would need a copy of the data, which is exactly what the company wants to avoid. FSx for Windows File Server is an SMB file system built on Windows Server and is not the right target for a NetApp NFS estate. FSx for Lustre is a parallel file system for HPC and machine learning; it is not designed for general-purpose SMB file serving."
  },
  {
    "id": 340,
    "domain": 3,
    "ts": "3.1",
    "q": "A company runs a Linux analytics application on Amazon EC2 instances that currently share data through a self-managed ZFS-based NFS server in its data center. The team wants a fully managed AWS file system that the application can mount over NFS without code changes, that delivers consistently low latency, and that supports point-in-time snapshots and near-instant volume clones used to spin up test copies. SMB and iSCSI access are not required. Which solution meets these requirements?",
    "options": [
      "Create an Amazon FSx for Windows File Server file system and mount the shares from the EC2 instances.",
      "Create an Amazon EFS file system in General Purpose performance mode and mount it from the EC2 instances.",
      "Create an Amazon FSx for OpenZFS file system and mount it from the EC2 instances over NFS.",
      "Attach an Amazon EBS io2 volume with Multi-Attach enabled to each EC2 instance."
    ],
    "correct": 2,
    "explanation":
      "FSx for OpenZFS is a managed file system built on the OpenZFS file system, accessed over NFS, and it supports OpenZFS snapshots and instant volume clones, which matches the existing ZFS workflow with no application change. EFS is a managed NFS file system but it has no ZFS snapshot or clone semantics and its latency profile is higher than FSx for OpenZFS. FSx for Windows File Server exposes SMB shares, which the Linux application does not use. EBS Multi-Attach is block storage limited to instances in one Availability Zone and it requires a cluster-aware file system; it is not a shared NFS file system."
  },
  {
    "id": 341,
    "domain": 3,
    "ts": "3.1",
    "q": "A data lake stored in a single Amazon S3 bucket is shared by dozens of teams and applications. Each consumer must be limited to its own prefix, and several consumers must be reachable only from a specific VPC. The bucket policy has grown large and hard to maintain, and the security team wants each consumer to use its own named endpoint with its own policy instead of adding more statements to the bucket policy. Which solution meets these requirements?",
    "options": [
      "Copy each prefix into a dedicated S3 bucket, and attach a separate bucket policy to each of those buckets.",
      "Enable S3 Versioning on the bucket, and use object ACLs on each object to grant the appropriate consumer read access to the objects stored under its own prefix within the bucket.",
      "Create an AWS Lambda function that signs and proxies every request to the bucket on behalf of each of the consumers, and keep an allow list of prefixes inside it.",
      "Create an S3 access point for each consumer, scoped to the consumer's prefix with its own access point policy, and set the network origin to VPC where required."
    ],
    "correct": 3,
    "explanation":
      "S3 access points are named network endpoints attached to a bucket, each with its own access point policy and network controls, including an origin restricted to a VPC. They let you decompose one oversized bucket policy into per-consumer policies without duplicating data. Copying prefixes into separate buckets duplicates storage and creates a synchronization problem. Object ACLs are a legacy mechanism that AWS recommends against and that does not scale to prefix-level grants for dozens of consumers. A Lambda proxy is custom code in the data path and adds latency and operational overhead."
  },
  {
    "id": 342,
    "domain": 3,
    "ts": "3.1",
    "q": "A company stores customer records as JSON objects in an Amazon S3 bucket, and an existing billing application retrieves them with standard GetObject requests. A new internal reporting team must receive the same objects with national identity numbers and email addresses masked. The company does not want to store a second redacted copy of every object, does not want to modify the billing application, and requires the reporting application to keep issuing ordinary GetObject requests without embedding any transformation logic. Which solution meets these requirements with the LEAST operational overhead?",
    "options": [
      "Run a scheduled AWS Glue job that writes a redacted copy of every object to a second prefix and point the internal application at that prefix.",
      "Create an S3 Object Lambda Access Point backed by an AWS Lambda function that masks the personal data, and point the internal application at that access point.",
      "Attach a bucket policy that denies the internal application access to the personal data fields inside the objects.",
      "Serve the objects through an Amazon CloudFront distribution and use a CloudFront function to remove the personal data from each response."
    ],
    "correct": 1,
    "explanation":
      "An S3 Object Lambda Access Point invokes a Lambda function on the GetObject path and returns the transformed bytes to the caller, so a single stored copy serves both audiences and the client keeps making ordinary GetObject calls. A Glue job creates the duplicate copy the company rejected and adds a synchronization lag. A bucket policy authorizes whole objects and cannot inspect or rewrite their contents. CloudFront functions are lightweight, run under strict time and memory limits, and cannot access the response body, so they cannot redact object payloads. Note that since November 7, 2025, S3 Object Lambda is available only to accounts already using it and to selected AWS Partner Network partners."
  },
  {
    "id": 343,
    "domain": 3,
    "ts": "3.1",
    "q": "A company is moving a Windows .NET application to Amazon EC2. Several hundred employees also open the same documents directly from their Windows workstations. The application stores documents on SMB file shares, relies on Active Directory identities for file and folder permissions, uses DFS namespaces, and enforces per-user storage quotas. The company requires a fully managed multi-AZ file system and does not want to run and patch Windows file servers. Which solution meets these requirements?",
    "options": [
      "Create an Amazon EFS file system and mount it on the Windows instances with an NFS client.",
      "Store the documents in an Amazon S3 bucket and access them from the application through the AWS SDK.",
      "Deploy two Windows Server EC2 instances in different Availability Zones, configure DFS Replication between them, and store the shares on EBS volumes.",
      "Create a Multi-AZ Amazon FSx for Windows File Server file system joined to AWS Directory Service and migrate the shares to it."
    ],
    "correct": 3,
    "explanation":
      "FSx for Windows File Server is a fully managed file system built on Windows Server that natively provides SMB shares, Active Directory integration for NTFS permissions, DFS namespaces, user quotas, and a Multi-AZ deployment option. EFS is an NFS file system without Windows ACL and DFS namespace support. Self-managed Windows file servers with DFS Replication put the patching and failover burden back on the company. Moving to S3 requires rewriting the application, because S3 is object storage and provides no SMB interface or NTFS permissions."
  },
  {
    "id": 344,
    "domain": 3,
    "ts": "3.2",
    "q": "A manufacturing company runs a control application in a factory. The application must process machine telemetry with very low latency to equipment on the plant floor, the regulator requires that the raw telemetry stay on the factory site, and the workload must keep running when the network link to the AWS Region is temporarily unavailable. The team wants to deploy it with the same EC2 and Amazon EBS APIs it already uses in the Region. Which solution meets these requirements?",
    "options": [
      "Install AWS Outposts in the factory and run the application on EC2 instances in an Outpost subnet of the company's VPC.",
      "Extend the VPC to an AWS Local Zone and run the application on EC2 instances in the Local Zone subnet.",
      "Run the application on EC2 instances in the Region and connect the factory through an AWS Site-to-Site VPN.",
      "Run the application on EC2 instances in an AWS Wavelength Zone attached to a carrier network."
    ],
    "correct": 0,
    "explanation":
      "AWS Outposts places AWS-managed compute and storage on the customer site, exposes the same EC2 and EBS APIs as the Region, keeps the data local, and supports local processing when connectivity to the parent Region is interrupted. Local Zones and Wavelength Zones are AWS-owned facilities in metropolitan areas and in carrier networks, not on the customer premises, so neither satisfies the on-site data residency requirement. Running everything in the Region over a VPN leaves the plant floor dependent on the WAN link and adds round-trip latency to every control decision."
  },
  {
    "id": 345,
    "domain": 3,
    "ts": "3.2",
    "q": "A media company runs a video editing application on Amazon EC2. Its editors work from a large metropolitan area far from the nearest AWS Region and report noticeable interactive lag. The company cannot install any hardware in its offices, wants single-digit millisecond latency between the editors and the compute, and wants to keep its databases and archives in the parent Region without redesigning the application. Which solution meets these requirements?",
    "options": [
      "Create an Amazon CloudFront distribution with the editing application's load balancer as the origin.",
      "Extend the VPC with a subnet in an AWS Local Zone near that metropolitan area and run the editing instances there.",
      "Order an AWS Outposts rack and install it in the company's office building.",
      "Migrate the editing instances to a second AWS Region and use Amazon Route 53 latency-based routing."
    ],
    "correct": 1,
    "explanation":
      "AWS Local Zones place compute, storage, and selected services close to large population centers and are an extension of the same VPC, so the editing instances get single-digit millisecond latency to nearby users while the rest of the stack stays in the parent Region. CloudFront accelerates cacheable HTTP content and does not help an interactive editing session running on EC2. Outposts requires installing and hosting hardware in the office, which the company excludes. Deploying a second Region does not bring the compute closer than a Local Zone and duplicates the whole environment."
  },
  {
    "id": 346,
    "domain": 3,
    "ts": "3.2",
    "q": "A gaming studio is launching an augmented reality mobile application. Players connect from mobile devices over a telecommunications provider's 5G network, and the rendering backend must respond in a few milliseconds. The studio wants player traffic to reach the compute without leaving the carrier network and traversing the public internet, while the game's account database stays in the parent AWS Region. Which solution meets these requirements?",
    "options": [
      "Deploy the rendering backend on EC2 instances in the parent Region behind AWS Global Accelerator.",
      "Deploy the rendering backend on EC2 instances in an AWS Local Zone located in each country where the game is launched to players.",
      "Deploy the rendering backend on AWS Outposts servers installed in the carrier's data centers.",
      "Deploy the rendering backend on EC2 instances in AWS Wavelength Zones embedded in the carrier's 5G network."
    ],
    "correct": 3,
    "explanation":
      "AWS Wavelength deploys AWS compute and storage inside communications service providers' networks, so traffic from 5G devices reaches the application without leaving the carrier network, while the Wavelength Zone remains part of a VPC in the parent Region. Global Accelerator improves the path over the AWS backbone but the traffic still exits the carrier network to the Region. Local Zones sit in metropolitan areas and are reached over the internet, not from inside the mobile network. Outposts is deployed on the customer's own premises and is not a way to place capacity inside a carrier's mobile network."
  },
  {
    "id": 347,
    "domain": 3,
    "ts": "3.2",
    "q": "A company runs a containerized media transcoding service on Amazon ECS. Each container must read and write a large scratch cache on the local NVMe instance store of the host for performance, and the security team requires the hosts to boot from a hardened custom AMI that it maintains. The workload is steady during business hours and the company wants the highest sustained throughput per container. Which solution meets these requirements?",
    "options": [
      "Run the ECS tasks on AWS Fargate, and attach an Amazon EFS file system to hold the scratch cache, mounted through the EFS volume configuration set in the task definition.",
      "Run the ECS tasks on AWS Fargate with the ephemeral storage raised to the maximum supported size.",
      "Run the ECS tasks with the EC2 launch type on a capacity provider backed by an Auto Scaling group of instance store-enabled instances launched from the custom AMI.",
      "Run the containers as AWS Lambda functions packaged as container images, and store the scratch data in the temporary directory of every one of the function invocations."
    ],
    "correct": 2,
    "explanation":
      "The EC2 launch type is required here: AWS Fargate does not let you choose the underlying host image or expose the host's NVMe instance store, so a hardened custom AMI and instance store scratch space are only possible on ECS container instances you own, managed through a capacity provider and an Auto Scaling group. Fargate with EFS replaces local NVMe with a network file system, which lowers throughput and does not address the custom AMI requirement. Increasing Fargate ephemeral storage grows the volume but still gives no control over the host image. Lambda is not designed for sustained transcoding and offers only a small temporary directory."
  },
  {
    "id": 348,
    "domain": 3,
    "ts": "3.2",
    "q": "A research organization needs to run thousands of independent containerized simulation jobs every night. The jobs have different vCPU and memory requirements, individual runs last from twenty minutes to several hours, and any job can be safely interrupted and retried. The team does not want to operate a scheduler or keep idle capacity between runs, and wants the lowest possible compute cost. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Package each simulation as an AWS Batch job definition and submit the runs to an AWS Batch job queue.",
      "Provision an Auto Scaling group sized for the nightly peak and trigger the simulations with a cron job on each instance.",
      "Configure the AWS Batch managed compute environment to use Amazon EC2 Spot capacity and to scale down to zero when the queue is empty.",
      "Rewrite each simulation as an AWS Lambda function invoked by an Amazon EventBridge rule.",
      "Store the job parameters in an Amazon SQS FIFO queue and have a fixed fleet of EC2 workers poll it."
    ],
    "correct": [0, 2],
    "explanation":
      "AWS Batch provides the job definitions, job queues, and scheduler for batch workloads and provisions capacity only when jobs are queued, so submitting the simulations to a Batch job queue removes the custom scheduler. Backing the managed compute environment with Spot capacity gives the lowest cost for work that tolerates interruption, and scaling to zero removes idle spend between nightly runs. A peak-sized Auto Scaling group with cron keeps paying for idle instances and reintroduces scheduling logic. Lambda cannot run a job for several hours. An SQS queue with a fixed worker fleet is another hand-built scheduler that keeps idle capacity."
  },
  {
    "id": 349,
    "domain": 3,
    "ts": "3.3",
    "q": "A company runs a self-managed MongoDB replica set on Amazon EC2 that stores product catalog documents as JSON. The catalog is read far more often than it is written. The operations team spends significant time on backups, patching, and adding replicas as read traffic grows. The company wants a managed AWS database that its existing MongoDB drivers and queries can use unchanged, and that can add read capacity quickly. Which solution meets these requirements?",
    "options": [
      "Migrate the collections to Amazon DynamoDB and rewrite the data access layer to use the DynamoDB API.",
      "Migrate the data to Amazon DocumentDB (with MongoDB compatibility) and add replica instances to the cluster for reads.",
      "Migrate the data to Amazon Keyspaces (for Apache Cassandra) and query it with the Cassandra Query Language.",
      "Migrate the data to Amazon RDS for PostgreSQL and store each document in a JSONB column."
    ],
    "correct": 1,
    "explanation":
      "Amazon DocumentDB is a managed document database that emulates the MongoDB API, so existing drivers and queries keep working, and it handles backups and patching while letting you add replica instances that serve reads. DynamoDB is a managed NoSQL database but it exposes a different API, so the application would have to be rewritten, which the company wants to avoid. Keyspaces is Cassandra-compatible, not MongoDB-compatible, and uses CQL. RDS for PostgreSQL with JSONB can store documents but requires rewriting every query in SQL."
  },
  {
    "id": 350,
    "domain": 3,
    "ts": "3.3",
    "q": "A company operates a self-managed Apache Cassandra cluster on Amazon EC2 for a time-series workload. The team spends most of its time on node replacement, compaction tuning, and capacity planning for unpredictable traffic. Peaks are hard to forecast, so the cluster is over-provisioned most of the time. The company wants to keep its existing Cassandra Query Language application code and drivers, stop managing servers, and have table throughput scale automatically with traffic. Which solution meets these requirements?",
    "options": [
      "Deploy Cassandra on Amazon EKS and manage the cluster with a Kubernetes operator.",
      "Migrate the tables to Amazon DynamoDB and adapt the application to the DynamoDB API.",
      "Migrate the workload to Amazon MemoryDB and query it with the Redis protocol.",
      "Migrate the tables to Amazon Keyspaces (for Apache Cassandra) and keep using CQL."
    ],
    "correct": 3,
    "explanation":
      "Amazon Keyspaces is a managed, serverless, Apache Cassandra-compatible service: there are no servers to provision or patch, tables scale up and down with application traffic, and the existing CQL code and drivers continue to work. Running Cassandra on EKS keeps every operational task the team wants to shed. DynamoDB is serverless but exposes a different API and would require rewriting the data access layer. MemoryDB is an in-memory database with a Redis-compatible interface and does not run CQL."
  },
  {
    "id": 351,
    "domain": 3,
    "ts": "3.3",
    "q": "An Amazon Aurora PostgreSQL cluster in eu-west-1 backs a global application. All writes are issued by a service in Europe and must stay there, but analytics dashboards used by teams in Asia and North America run read-only queries and suffer from cross-Region round-trip latency. The dashboards issue read-only SQL and tolerate data that is a few seconds old. The company wants those dashboards to read from a local endpoint in their own Region. Which solution meets these requirements?",
    "options": [
      "Convert the cluster to an Aurora global database and create secondary clusters in Asia and North America for the dashboards to read from.",
      "Add more Aurora Replicas in eu-west-1 and point the dashboards at the cluster's reader endpoint.",
      "Deploy an Amazon ElastiCache cluster in each Region and have the dashboards query the cache instead of the database.",
      "Create an Amazon CloudFront distribution with the Aurora cluster endpoint as its origin so dashboard queries are served from edge locations."
    ],
    "correct": 0,
    "explanation":
      "An Aurora global database replicates a primary cluster to secondary Regions with typically sub-second lag, and each secondary cluster serves low-latency local reads while writes stay on the primary, which is exactly the read pattern described. Adding replicas in eu-west-1 increases read capacity but the queries still cross an ocean. ElastiCache in each Region would require the application to populate and invalidate the cache and does not answer arbitrary analytical SQL. CloudFront is an HTTP content delivery network and cannot front a PostgreSQL endpoint."
  },
  {
    "id": 352,
    "domain": 3,
    "ts": "3.3",
    "q": "A microservice running on Amazon ECS scales from a few tasks to several hundred during traffic spikes. Every task opens its own pool of connections to an Amazon RDS for MySQL instance. During spikes the database reaches its maximum connection limit, new tasks fail to connect, and a significant share of database CPU is spent establishing and tearing down connections. Which solution meets these requirements with the LEAST application change?",
    "options": [
      "Put Amazon RDS Proxy in front of the database and have the tasks connect to the proxy endpoint.",
      "Increase the max_connections value in the RDS parameter group and restart the instance.",
      "Add two read replicas and send half of the traffic to their endpoints.",
      "Enable Multi-AZ on the RDS instance so that the standby absorbs the extra connections."
    ],
    "correct": 0,
    "explanation":
      "RDS Proxy maintains a warm pool of database connections and multiplexes many short-lived client connections onto far fewer database connections, which removes the connection storm and its CPU cost, and it only requires pointing the tasks at the proxy endpoint. Raising max_connections consumes more memory on the instance and does not eliminate the churn. Read replicas offload read queries but the connection pressure comes from every task, including writers, and routing reads requires application changes. Multi-AZ is for availability; the standby serves no client connections."
  },
  {
    "id": 353,
    "domain": 3,
    "ts": "3.4",
    "q": "A company runs workloads in several VPCs in eu-west-1 and several VPCs in ap-southeast-1. Each Region already has a transit gateway that connects its local VPCs. Applications in eu-west-1 now need private connectivity to applications in ap-southeast-1, the traffic must stay on the AWS network, and the network team refuses to build and maintain a full mesh of connections between individual VPCs. Which solution meets these requirements?",
    "options": [
      "Create a VPC peering connection between every VPC in eu-west-1 and every VPC in ap-southeast-1.",
      "Create an AWS Site-to-Site VPN between the two Regions over the public internet and route inter-Region traffic through it.",
      "Create an AWS PrivateLink endpoint service in each VPC and an interface endpoint in every VPC that needs to reach it.",
      "Create an inter-Region peering attachment between the two transit gateways and update the transit gateway route tables."
    ],
    "correct": 3,
    "explanation":
      "Transit gateways in different Regions can be connected with an inter-Region peering attachment; traffic between the two hubs stays on the AWS global network and is encrypted, and each Region keeps a single hub with route tables instead of a mesh. A full mesh of VPC peering connections is exactly the operational burden the team rejects and scales quadratically. A VPN between Regions sends traffic over the public internet and adds tunnel throughput limits. PrivateLink exposes individual services rather than providing general connectivity between VPCs, so it does not replace inter-Region routing."
  },
  {
    "id": 354,
    "domain": 3,
    "ts": "3.4",
    "q": "A provider team hosts an internal HTTP service behind a Network Load Balancer in its own VPC. Several consumer VPCs, some belonging to other accounts, must call this service. Several consumer VPCs use CIDR ranges that overlap with each other and with the provider VPC, and the security team requires that consumers be able to reach this one service and nothing else in the provider VPC. Which solution meets these requirements?",
    "options": [
      "Create a VPC peering connection between the provider VPC and each consumer VPC and restrict traffic with route tables.",
      "Create an AWS PrivateLink endpoint service on the Network Load Balancer and have each consumer create an interface VPC endpoint for it.",
      "Attach all of the VPCs to a transit gateway and use transit gateway route tables to restrict traffic to the service.",
      "Re-address the overlapping consumer VPCs and connect them to the provider VPC with an AWS Site-to-Site VPN."
    ],
    "correct": 1,
    "explanation":
      "AWS PrivateLink exposes a single service behind a Network Load Balancer through interface endpoints in the consumer VPCs. Because the connection is made to an endpoint elastic network interface inside each consumer VPC, overlapping CIDR ranges are not a problem, and consumers reach only the published service. VPC peering and transit gateway attachments both route between CIDR ranges and cannot be established with overlapping address space, and both expose network reachability rather than a single service. Re-addressing production VPCs is a large, disruptive project that PrivateLink makes unnecessary."
  },
  {
    "id": 355,
    "domain": 3,
    "ts": "3.4",
    "q": "An industrial platform receives MQTT over TLS on TCP port 8883 from devices deployed worldwide. The devices connect to Network Load Balancers in three AWS Regions, and their firmware has a fixed list of destination IP addresses that cannot be updated in the field. The company wants device traffic to enter the AWS network as close to the device as possible and to move to another Region automatically if one Region becomes unhealthy. Which solution meets these requirements?",
    "options": [
      "Create an AWS Global Accelerator standard accelerator with the Network Load Balancers in the three Regions as endpoints.",
      "Create an Amazon CloudFront distribution with the Network Load Balancers as origins and enable origin failover.",
      "Create Amazon Route 53 latency-based records for the three Network Load Balancers and associate a health check with each of those records.",
      "Assign an Elastic IP address to a NAT gateway in each Region and publish the three addresses to the devices."
    ],
    "correct": 0,
    "explanation":
      "Global Accelerator provides static anycast IP addresses that satisfy the fixed firmware allowlist, accepts TCP and UDP traffic, moves traffic onto the AWS global network at the nearest edge location, and shifts to a healthy endpoint Region automatically when health checks fail. CloudFront only proxies HTTP and HTTPS, so it cannot carry MQTT on port 8883. Route 53 returns different IP addresses depending on latency and health, which breaks devices that only accept a fixed set of addresses, and DNS failover depends on client-side caching. NAT gateways handle outbound traffic and do not front inbound device connections."
  },
  {
    "id": 356,
    "domain": 3,
    "ts": "3.4",
    "q": "A company runs a hybrid analytics workload that copies several terabytes between its data center and Amazon S3 every night over an AWS Site-to-Site VPN across the public internet. Throughput varies widely from night to night and the transfer often misses its completion window. The same link also carries interactive application traffic during the day. The company wants consistent, predictable bandwidth and lower, more stable latency for this recurring transfer. Which solution will meet these requirements?",
    "options": [
      "Order AWS Snowball Edge devices and ship them to AWS after each nightly extract.",
      "Add a second Site-to-Site VPN tunnel and load-balance the transfer across both tunnels.",
      "Order an AWS Direct Connect dedicated connection between the data center and the AWS Region and route the transfer over it.",
      "Enable Amazon S3 Transfer Acceleration on the destination bucket and keep using the existing VPN."
    ],
    "correct": 2,
    "explanation":
      "AWS Direct Connect provides a dedicated private connection with a committed port speed, so throughput and latency no longer depend on internet congestion, which is what a recurring multi-terabyte nightly window needs. A second VPN tunnel still rides the public internet and each tunnel has its own throughput ceiling, so variability remains. Snowball is for one-time or occasional bulk migrations and its shipping time is incompatible with a nightly job. S3 Transfer Acceleration routes uploads over the AWS edge network but it applies to traffic sent to public S3 endpoints and does not give the predictable bandwidth of a dedicated link."
  },
  {
    "id": 357,
    "domain": 3,
    "ts": "3.5",
    "q": "A company runs a self-managed Apache Kafka cluster on Amazon EC2 that ingests events from dozens of producers. The operations team handles broker patching, cluster rebalancing, and storage expansion, and wants to stop doing so. Dozens of producer and consumer applications already use the Apache Kafka APIs, and the company does not want to modify or recompile them during the migration. Which solution meets these requirements?",
    "options": [
      "Replace the cluster with Amazon Kinesis Data Streams and rewrite the producers and consumers to use the Kinesis APIs.",
      "Replace the cluster with an Amazon SQS queue for each topic and have consumers poll the queues.",
      "Migrate the topics to Amazon Managed Streaming for Apache Kafka (Amazon MSK) and repoint the applications at the MSK bootstrap brokers.",
      "Replace the cluster with an Amazon SNS topic per event type and subscribe the consumers to the topics."
    ],
    "correct": 2,
    "explanation":
      "Amazon MSK runs open-source Apache Kafka and AWS manages broker provisioning, patching, and storage, so the existing producers and consumers keep using the Kafka APIs and only need the new bootstrap broker endpoints. Kinesis Data Streams is a comparable streaming service but exposes a different API, so every application would have to be rewritten. SQS is a queue without the Kafka consumer group and replay semantics these applications rely on. SNS is a pub/sub notification service and does not provide durable, replayable partitioned streams."
  },
  {
    "id": 358,
    "domain": 3,
    "ts": "3.5",
    "q": "An analytics team receives raw CSV files in an Amazon S3 bucket every hour. Before analysts can query the data, the schema must be discovered and kept up to date, and the files must be converted to a columnar format and partitioned by date. The team has no Spark administrators and does not want to provision, size, or patch any cluster for this recurring transformation. Which solution meets these requirements with the LEAST operational overhead?",
    "options": [
      "Schedule an AWS Glue crawler to populate the AWS Glue Data Catalog and run an AWS Glue ETL job that writes partitioned Parquet files back to Amazon S3.",
      "Launch a long-running Amazon EMR cluster and submit an hourly Apache Spark job that converts the files.",
      "Run the conversion on an Amazon EC2 instance with Apache Spark installed and trigger it from a cron job.",
      "Trigger an AWS Lambda function on each S3 upload event that loads all of the files into memory and rewrites the full dataset."
    ],
    "correct": 0,
    "explanation":
      "AWS Glue provides both halves of this pipeline as serverless components: crawlers infer and update the schema in the Glue Data Catalog, and Glue ETL jobs run managed Spark to write partitioned Parquet without any cluster to size or patch. A long-running EMR cluster must be sized, patched, and paid for between hourly runs. A Spark installation on EC2 adds even more administration. A Lambda function that rewrites the whole dataset will run into the function timeout and memory limits as the data grows, and it still leaves the schema undiscovered."
  },
  {
    "id": 359,
    "domain": 3,
    "ts": "3.5",
    "q": "A financial analytics team needs a commercial market data set from an external provider. New revisions are published on a regular schedule and must land in the company's own Amazon S3 bucket so that Amazon Athena can query them. The team wants an entitled subscription with automated delivery of each new revision, and does not want to build and maintain scraping or file transfer jobs against the provider. Which solution meets these requirements?",
    "options": [
      "Ask the provider for SFTP credentials and use AWS DataSync to pull the files into Amazon S3 on a schedule.",
      "Subscribe to the provider's data set in AWS Data Exchange and export new revisions to the company's Amazon S3 bucket.",
      "Ask the provider to ship an AWS Snowball device with each new revision of the data set.",
      "Deploy the provider's AWS Marketplace AMI on an Amazon EC2 instance and have it download the data set."
    ],
    "correct": 1,
    "explanation":
      "AWS Data Exchange lets a subscriber find and subscribe to third-party data sets and then receive each new revision in its own S3 bucket, with entitlements and billing handled through AWS, so no transfer code is written. DataSync over SFTP puts the company back in the business of maintaining credentials and transfer jobs and provides no entitlement management. Snowball is for bulk physical transfer and is not a subscription mechanism for regularly published revisions. A Marketplace AMI delivers software to run, not a managed data subscription."
  },
  {
    "id": 360,
    "domain": 3,
    "ts": "3.5",
    "q": "A company stores its data lake in Amazon S3 and queries it with Amazon Athena. Analyst groups in several AWS accounts must each see only certain tables, and some groups must not see columns that contain personal data. The tables are already described in the AWS Glue Data Catalog. The data governance team wants to administer these grants centrally on catalog objects instead of writing and reviewing a growing set of bucket policies. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Register the Amazon S3 data lake locations with AWS Lake Formation so that Lake Formation manages access to the underlying data.",
      "Grant each analyst group database, table, and column-level permissions on the AWS Glue Data Catalog resources through AWS Lake Formation.",
      "Create one Amazon S3 bucket per analyst group and copy the authorized tables into each bucket with a nightly job.",
      "Attach an Amazon S3 bucket policy for each analyst group that allows only the prefixes of the tables the group may read, and exclude the personal data columns with a separate deny statement.",
      "Create a separate AWS Glue Data Catalog in every analyst account and crawl only the authorized prefixes."
    ],
    "correct": [0, 1],
    "explanation":
      "Registering the S3 locations with Lake Formation makes Lake Formation the authority that vends credentials for the underlying data, which is the prerequisite for its permission model. Lake Formation grants can then be issued on Data Catalog databases, tables, and columns, including across accounts, giving column-level control from one place. Copying tables into per-group buckets duplicates data and creates stale copies. Per-group bucket policies are exactly the prefix-based sprawl the governance team wants to replace and cannot express column-level rules. A separate Data Catalog per account fragments metadata and multiplies the crawlers and grants to maintain."
  },
  {
    "id": 3,
    "domain": 4,
    "ts": "4.4",
    "q": "An application runs on Amazon EC2 instances in private subnets of a dual-stack VPC. The subnets and the instances already have IPv6 addresses, and the only outbound traffic the instances generate goes to partner APIs that are reachable over IPv6. That traffic leaves over IPv4 through a NAT gateway today, and the NAT gateway hourly charge and data processing charge dominate the networking bill. The instances must stay unreachable from the internet. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Replace the NAT gateway with a NAT instance that runs on a small Amazon EC2 instance in a public subnet, so that the per-GB processing charge becomes instance hours instead.",
      "Create an egress-only internet gateway, route ::/0 from the private subnet route tables to it, send the partner traffic over IPv6, and delete the NAT gateway.",
      "Attach an internet gateway to the route tables of the private subnets, and assign a public IPv4 address to each of the instances that runs in those private subnets today.",
      "Create interface VPC endpoints backed by AWS PrivateLink for the partner APIs, and route every one of the outbound partner traffic flows to those endpoints inside the VPC."
    ],
    "correct": 1,
    "explanation":
      "An egress-only internet gateway allows outbound communication over IPv6 from instances in a VPC to the internet and prevents the internet from initiating an IPv6 connection with those instances, which is exactly the requirement here. There is no charge for an egress-only internet gateway, so moving the partner traffic to IPv6 removes both the NAT gateway hourly charge and its per-GB data processing charge. A NAT instance still bills EC2 instance hours and data transfer, and it has to be patched, monitored, and scaled by the team. Attaching an internet gateway and assigning public addresses would let hosts on the internet initiate connections to the instances. Interface VPC endpoints reach AWS services and services published through AWS PrivateLink, not arbitrary APIs on the internet."
  },
  {
    "id": 7,
    "domain": 4,
    "ts": "4.1",
    "q": "A company stores 50 TB of application logs in S3 Standard. Logs older than 30 days are rarely accessed but must stay retrievable with millisecond access. After one year, the logs must be kept but a retrieval time of several hours is acceptable. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Retain all objects in S3 Standard, and turn on S3 Versioning so that the volume pricing tiers apply as the total amount of stored data keeps growing.",
      "Create a lifecycle configuration that transitions objects to S3 Standard-IA after 30 days and to S3 Glacier Flexible Retrieval after 365 days.",
      "Create a lifecycle configuration that transitions the objects to S3 Glacier Deep Archive on the day that they are uploaded, where a restore can take up to 12 hours.",
      "Create a lifecycle configuration that transitions the objects to S3 One Zone-IA after 30 days and then expires them after 365 days, kept in one Availability Zone."
    ],
    "correct": 1,
    "explanation":
      "S3 Standard-IA is designed for long-lived, infrequently accessed data that still needs millisecond access, and S3 Glacier Flexible Retrieval is a low-cost archive class whose Standard retrieval typically finishes in 3 to 5 hours. A lifecycle configuration applies both transitions automatically. Keeping everything in S3 Standard does not reduce cost, and versioning adds storage. Transitioning to S3 Glacier Deep Archive immediately removes the millisecond access needed during the first 30 days. S3 One Zone-IA stores data in a single Availability Zone, and expiring the logs at 365 days deletes data that must be retained."
  },
  {
    "id": 12,
    "domain": 4,
    "ts": "4.2",
    "q": "A company runs an Amazon EC2 workload 24 hours a day throughout the year with steady, predictable usage. The company wants the lowest possible rate while keeping the ability to move the workload to a different instance family during the commitment term. Which solution will meet these requirements?",
    "options": [
      "Purchase an EC2 Instance Savings Plan for the instance family that is in use today.",
      "Purchase a Compute Savings Plan for the committed hourly spend.",
      "Run the workload on Spot Instances with a diversified allocation strategy.",
      "Create On-Demand Capacity Reservations for the required number of instances."
    ],
    "correct": 1,
    "explanation":
      "Compute Savings Plans provide prices up to 66% off On-Demand rates and apply automatically to EC2 usage regardless of instance family, instance size, Region, operating system, or tenancy, so the workload can move to another family and keep the discounted rate. An EC2 Instance Savings Plan reaches up to 72% off On-Demand but commits to one instance family in one Region, which blocks the family change. Spot Instances can be interrupted at any time and do not suit a continuous production workload. On-Demand Capacity Reservations reserve capacity in an Availability Zone and provide no discount on their own."
  },
  {
    "id": 19,
    "domain": 4,
    "ts": "4.4",
    "q": "Two VPCs in the same AWS Region exchange several terabytes of traffic every month between two application tiers. The VPCs are connected through an AWS Transit Gateway that carries no other attachment, and the networking team is asked to reduce the cost of that connectivity without changing the applications or their IP addressing. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Route the traffic through a NAT gateway in each VPC instead of the transit gateway.",
      "Publish the receiving service through AWS PrivateLink and connect to it with an interface VPC endpoint.",
      "Replace the transit gateway with a VPC peering connection between the two VPCs and update the route tables.",
      "Move the transit gateway attachments into a single Availability Zone in each VPC."
    ],
    "correct": 2,
    "explanation":
      "AWS Transit Gateway bills an hourly charge for every attachment plus a per-GB data processing charge on the traffic it carries, so a transit gateway used only to connect one pair of VPCs is the expensive way to do it. A VPC peering connection carries no hourly or per-GB charge of its own; only the usual data transfer rates apply. A NAT gateway is for outbound access to the internet and adds its own hourly and per-GB processing charges. AWS PrivateLink also bills per endpoint hour and per GB processed and exposes a single service rather than general connectivity between the tiers. Concentrating the attachments in one Availability Zone removes cross-Availability Zone transfer but keeps every transit gateway charge and creates a zonal single point of failure."
  },
  {
    "id": 24,
    "domain": 4,
    "ts": "4.3",
    "q": "A company runs a write-heavy application on an Amazon Aurora PostgreSQL cluster. Reviewing the bill, the finance team finds that the Aurora I/O charges account for well over a third of the total Aurora spend every month, and it wants a more predictable database bill without changing the application or reducing the workload. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Migrate the cluster to Amazon RDS for PostgreSQL with a gp3 volume.",
      "Switch the cluster to the Aurora I/O-Optimized configuration.",
      "Add an Aurora read replica so that the read traffic no longer generates I/O charges.",
      "Enable the Aurora Serverless v2 capacity type for the writer instance."
    ],
    "correct": 1,
    "explanation":
      "Aurora I/O-Optimized is a cluster storage configuration in which read and write I/O operations are included in the price of the instances and storage, so the bill no longer varies with I/O volume. AWS states that it is the better choice when I/O spend exceeds about 25 percent of the total Aurora spend, which is the case here, and switching configuration requires no application change. Moving to RDS for PostgreSQL is a migration that changes the engine deployment and its performance characteristics, not a billing change. A read replica adds an instance and generates its own I/O; it does not make read I/O free. Aurora Serverless v2 changes how compute capacity scales and is billed; I/O is still billed separately unless the cluster also uses the I/O-Optimized configuration."
  },
  {
    "id": 28,
    "domain": 4,
    "ts": "4.3",
    "q": "A company has taken a manual Amazon RDS DB snapshot before every release for three years, and several hundred of those snapshots remain, including snapshots of DB instances that were decommissioned long ago. Every remaining DB instance also keeps its automated backup retention period at the maximum value. A cost review shows that backup storage is now the largest line of the Amazon RDS bill, and the team confirms that point-in-time recovery is required for the last 7 days only. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Stop each DB instance outside business hours so that its instance hours stop, and so that the backup storage already accumulated stops being billed as well.",
      "Reduce the allocated storage of each DB instance so that the automated backups taken afterwards are smaller, without touching the retention period.",
      "Copy the manual DB snapshots to a second AWS Region, and delete the copies that remain in the original Region, keeping only the copies in the destination Region.",
      "Delete the manual DB snapshots that are no longer needed and set the automated backup retention period to 7 days on each DB instance."
    ],
    "correct": 3,
    "explanation":
      "Amazon RDS backup storage in a Region is the sum of the automated backups and the manual DB snapshots in that Region. Manual snapshots are not deleted when a DB instance is deleted, so snapshots of decommissioned instances keep consuming billed backup storage until someone removes them, and shortening the retention period lets RDS age out automated backups beyond the 7 days the team actually needs for point-in-time recovery. Stopping a DB instance removes the DB instance hours but leaves provisioned storage and backup storage billed, so it does nothing for this bill. Allocated storage for an RDS DB instance can be increased but never decreased. Moving a snapshot to another Region increases the backup storage in the destination Region, so the data is still stored and still billed."
  },
  {
    "id": 32,
    "domain": 4,
    "ts": "4.3",
    "q": "A company refreshes three development environments every week from a 20 TB Amazon Aurora MySQL production cluster. Each refresh restores the latest snapshot into a new cluster, which takes several hours and multiplies the Aurora storage charge by the number of copies. Each environment needs its own writable copy of the production data, in the same AWS Region and the same account as the production cluster, isolated from that cluster. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Create an Aurora clone of the production cluster for each development environment, and delete the clones when the week ends.",
      "Restore the weekly snapshot into a single Aurora cluster that the three development teams share.",
      "Add three Aurora Replicas to the production cluster and give each development environment one reader endpoint.",
      "Export the production snapshot to Amazon S3 and load it into a separate Aurora cluster for each environment with AWS Database Migration Service."
    ],
    "correct": 0,
    "explanation":
      "Aurora cloning uses a copy-on-write protocol: the clone starts by pointing at the same data pages as the source cluster, and additional storage is allocated only when the source or the clone changes a page. For pages that stay identical, the storage charges apply only to the original cluster, so three clones cost far less than three full restored copies, and creating a clone is faster than physically copying the data by restoring a snapshot. A clone must be in the same Region as its source, which this scenario satisfies, and up to 15 copy-on-write clones can be created from a cluster. A single shared restored cluster is still a full copy of the volume and gives the three teams one environment instead of three. Aurora Replicas are read-only, share the production cluster volume, and add load to production rather than isolating it. Exporting to Amazon S3 and reloading with AWS Database Migration Service is slow and produces a complete second copy of the storage for every environment."
  },
  {
    "id": 36,
    "domain": 4,
    "ts": "4.3",
    "q": "An Amazon DynamoDB table has been running in on-demand capacity mode since launch. Two years of metrics show that its read and write traffic is steady and predictable, varying by less than 20 percent between the quietest and busiest hour of the day. The company wants to reduce what the table costs without risking throttling during normal operation. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Keep on-demand mode, and set a maximum read and write request rate on the table so that its cost cannot pass a known ceiling.",
      "Switch the table to provisioned capacity mode with auto scaling configured around the observed traffic.",
      "Enable DynamoDB Accelerator (DAX) in front of the table to serve the repeated reads, provisioning a cluster of cache nodes for it.",
      "Move the table data to Amazon S3, and query it with Amazon Athena instead, defining a table in the AWS Glue Data Catalog."
    ],
    "correct": 1,
    "explanation":
      "On-demand mode bills per request and is the right choice for unknown or spiky traffic; for a steady, predictable workload, provisioned capacity billed per hour of provisioned throughput is the cheaper mode, and auto scaling adjusts the provisioned values within a configured range so normal variation does not cause throttling. A maximum request rate on an on-demand table is a throttling safeguard, not a discount. DAX reduces read latency and read costs for cached items but adds cluster charges and does nothing for writes. Moving the data to S3 and querying it with Athena abandons the low-latency key-value access pattern the table exists for."
  },
  {
    "id": 42,
    "domain": 4,
    "ts": "4.2",
    "q": "A company runs a stable Amazon EC2 production workload and accepts a 1-year or 3-year term commitment to reduce cost. The company cannot make any payment at the start of the term. Which solution will meet these requirements?",
    "options": [
      "Purchase All Upfront Reserved Instances for the workload.",
      "Purchase Partial Upfront Reserved Instances for the workload.",
      "Purchase a No Upfront Savings Plan or No Upfront Reserved Instances for the workload.",
      "Run the workload on Spot Instances with persistent Spot Instance requests."
    ],
    "correct": 2,
    "explanation":
      "The No Upfront payment option, available for both Savings Plans and Reserved Instances, bills a discounted hourly rate for every hour of the term with no payment at the start, which satisfies the constraint even though the discount is smaller than the upfront options. All Upfront requires the full payment at the start of the term. Partial Upfront requires part of the cost at the start of the term. Spot Instances are not a term commitment and can be interrupted, so they do not suit a stable production workload."
  },
  {
    "id": 401,
    "domain": 4,
    "ts": "4.2",
    "q": "A company has run a business-critical web application on a fleet of Amazon EC2 instances 24 hours a day for 3 years with a stable, predictable load. The company wants to reduce cost with a 3-year Amazon EC2 commitment while keeping the ability to exchange that commitment for a different instance family during the term. Which solution will meet these requirements?",
    "options": [
      "Purchase 3-year Standard Reserved Instances with the All Upfront payment option.",
      "Purchase 3-year Convertible Reserved Instances.",
      "Run the fleet on Spot Instances managed by a Spot Fleet request.",
      "Run the fleet on On-Demand Instances in an Auto Scaling group."
    ],
    "correct": 1,
    "explanation":
      "Convertible Reserved Instances can be exchanged for another Convertible Reserved Instance with different instance attributes, including a different instance family, which is the only option that allows the change mid-term. Standard Reserved Instances provide the larger discount but can only be modified, never exchanged, so the family is fixed for the whole term. Spot Instances can be interrupted when Amazon EC2 needs the capacity back and are unsuitable for a permanently running critical application. On-Demand Instances carry no commitment and the highest rate for a continuous load."
  },
  {
    "id": 402,
    "domain": 4,
    "ts": "4.2",
    "q": "A data team runs batch video rendering jobs that tolerate interruption and resume from checkpoints. The jobs start at irregular times. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Purchase 1-year Standard Reserved Instances sized for the peak of the rendering fleet, committing to that instance family and Region for the full term.",
      "Run the whole rendering fleet on Dedicated Hosts instead.",
      "Run each rendering job on On-Demand Instances, and terminate those instances as soon as the job that they were running has completed.",
      "Run the rendering fleet on Spot Instances and use the two-minute interruption notice to checkpoint before an instance is reclaimed."
    ],
    "correct": 3,
    "explanation":
      "Spot Instances run on spare EC2 capacity at a price below the On-Demand price and provide a two-minute interruption notice, which a checkpointing renderer can use to save its state, so this is the cheapest fit for interruption-tolerant work with irregular timing. Standard Reserved Instances commit to a fixed configuration for a full year, so capacity is paid for even when no job runs. Dedicated Hosts pay for a whole physical server and address licensing and compliance needs. On-Demand Instances avoid the commitment but are billed at the full rate for every second the jobs run."
  },
  {
    "id": 403,
    "domain": 4,
    "ts": "4.2",
    "q": "A company expects a constant compute spend across Amazon EC2, AWS Fargate, and AWS Lambda for the next 3 years. The instance families and the Regions in use are expected to change during that period. The company wants the largest discount that still covers all three services. Which solution will meet these requirements?",
    "options": [
      "Purchase an EC2 Instance Savings Plan for the largest instance family in use.",
      "Purchase a Compute Savings Plan for the committed hourly spend.",
      "Purchase Standard Reserved Instances in every Region that is used.",
      "Purchase Convertible Reserved Instances in every Region that is used."
    ],
    "correct": 1,
    "explanation":
      "Compute Savings Plans provide prices up to 66% off On-Demand rates, apply to EC2 usage regardless of instance family, size, Region, operating system, or tenancy, and also apply to Fargate and Lambda usage, which is exactly the coverage required. An EC2 Instance Savings Plan reaches up to 72% off On-Demand but is tied to a single instance family in a single Region and does not cover Fargate or Lambda. Standard and Convertible Reserved Instances apply only to Amazon EC2 usage, so Fargate and Lambda spend would stay at On-Demand rates."
  },
  {
    "id": 404,
    "domain": 4,
    "ts": "4.1",
    "q": "An Amazon S3 bucket stores application logs. The logs are accessed frequently for 30 days, then a few times a year with millisecond retrieval required for the next 60 days, and then must be archived for 7 years where a retrieval time of several hours is acceptable. A single S3 Lifecycle rule must implement the whole sequence. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Transition objects to S3 Standard-IA after 30 days and to S3 Glacier Deep Archive after 90 days.",
      "Transition objects to S3 Glacier Instant Retrieval after 30 days and to S3 Glacier Deep Archive after 90 days.",
      "Transition objects to S3 One Zone-IA after 30 days and to S3 Glacier Flexible Retrieval after 90 days.",
      "Transition objects to S3 Intelligent-Tiering after 30 days and keep them there for 7 years."
    ],
    "correct": 0,
    "explanation":
      "S3 Standard-IA gives millisecond access with a 30-day minimum storage duration, which the 60-day window satisfies, and S3 Glacier Deep Archive is the lowest-cost class for a 7-year archive, with Standard retrieval finishing within 12 hours and Bulk retrieval within 48 hours. The S3 Glacier Instant Retrieval option cannot be expressed as a single lifecycle rule: that class has a 90-day minimum storage duration, and a single rule cannot transition an object out of a class before its minimum duration has elapsed, so the Deep Archive step would have to be at day 120 or later. S3 One Zone-IA stores only one copy in a single Availability Zone, and S3 Glacier Flexible Retrieval costs more per GB than Deep Archive over 7 years. S3 Intelligent-Tiering charges a per-object monitoring and automation fee that buys nothing when the access pattern is already known."
  },
  {
    "id": 405,
    "domain": 4,
    "ts": "4.1",
    "q": "An application stores objects in Amazon S3 whose access patterns are unpredictable: objects become inactive and then become active again at irregular intervals. The company wants to reduce storage cost automatically, without retrieval fees and without operational effort. Which solution will meet these requirements?",
    "options": [
      "Store the objects in S3 Standard-IA.",
      "Store the objects in S3 One Zone-IA.",
      "Store the objects in S3 Standard and use S3 Storage Class Analysis to build lifecycle rules manually.",
      "Store the objects in S3 Intelligent-Tiering."
    ],
    "correct": 3,
    "explanation":
      "S3 Intelligent-Tiering moves each object between access tiers as its access pattern changes, for a monthly per-object monitoring and automation fee and with no retrieval fees, so an object that becomes active again is served without an extra charge and without any operator action. S3 Standard-IA and S3 One Zone-IA both charge per-GB retrieval fees and impose a 30-day minimum storage duration and a 128 KB minimum billable object size, which penalizes objects that are read again soon after being tiered down; S3 One Zone-IA also stores the data in a single Availability Zone. S3 Storage Class Analysis only produces recommendations and still requires lifecycle rules to be written and maintained, which is the operational effort the company wants to avoid."
  },
  {
    "id": 406,
    "domain": 4,
    "ts": "4.4",
    "q": "EC2 instances in private subnets download large volumes of data from Amazon S3 and Amazon DynamoDB through a NAT gateway, and the NAT gateway data processing charges are high. The instances must remain unreachable from the internet. Which combination of steps will reduce these charges? (Select TWO.)",
    "multi": true,
    "options": [
      "Move the Amazon EC2 instances to public subnets, and assign them public IP addresses so that their traffic to Amazon S3 and Amazon DynamoDB no longer passes through the NAT gateway.",
      "Create a gateway VPC endpoint for Amazon S3 and add a route to it in the route tables of the private subnets.",
      "Deploy an additional NAT gateway in each Availability Zone so that the traffic of the instances is spread across more gateways.",
      "Create a gateway VPC endpoint for Amazon DynamoDB and add a route to it in the route tables of the private subnets.",
      "Replace the NAT gateway with a NAT instance that runs on a larger instance type and is billed per instance hour instead of per gigabyte."
    ],
    "correct": [1, 3],
    "explanation":
      "Amazon S3 and Amazon DynamoDB are the two services that support gateway VPC endpoints. A gateway endpoint adds a route to the subnet route table so the traffic reaches the service over the AWS network instead of the NAT gateway, there is no hourly or per-GB charge for gateway endpoints, and the instances keep no route to the internet. Moving the instances to public subnets with public IP addresses exposes them, which the requirement forbids. Adding NAT gateways adds fixed hourly charges on top of the same per-GB processing charge. A NAT instance on a larger instance type still forwards every byte and adds EC2 instance charges."
  },
  {
    "id": 407,
    "domain": 4,
    "ts": "4.2",
    "q": "A company runs dozens of workloads in separate AWS accounts that all belong to one organization in AWS Organizations. Each account buys its own Reserved Instances for its steady Amazon EC2 usage. Some of those Reserved Instances sit partly unused, while other accounts pay the On-Demand rate for matching instance usage in the same Region. Which solution will reduce the overall cost with the LEAST operational overhead?",
    "options": [
      "Purchase the Reserved Instances and Savings Plans from the management account, and confirm that Reserved Instance and Savings Plans discount sharing is in effect for the accounts in the organization.",
      "Migrate every workload into a single AWS account so that all Amazon EC2 usage is billed together and the existing Reserved Instances apply to any matching instance that the account launches in the Region.",
      "Convert all Reserved Instances to On-Demand Instances, and rely on Auto Scaling to shut down the unused capacity outside business hours.",
      "Create a separate AWS Organizations organization for each business unit, and buy Reserved Instances in the management account of each organization."
    ],
    "correct": 0,
    "explanation":
      "With discount sharing in effect, an hour of Reserved Instance or Savings Plans benefit that one account does not use is applied to matching usage in any other account of the organization, so commitments held in the management account stop being stranded in the account that bought them and cover the usage that is currently billed at the On-Demand rate. Migrating every workload into a single account would also pool the usage, but it destroys account-level isolation and governance and is far more disruptive. Dropping the commitments for On-Demand raises the rate paid on steady usage. Splitting the accounts into several organizations fragments the usage further and makes the problem worse."
  },
  {
    "id": 408,
    "domain": 4,
    "ts": "4.2",
    "q": "A solutions architect must be notified before an account's monthly spend exceeds a defined amount, based on the forecasted spend rather than the amount already incurred. Which solution will meet these requirements?",
    "options": [
      "Create an AWS Cost and Usage Report and query it with Amazon Athena on a schedule.",
      "Review the AWS Trusted Advisor cost optimization checks every week.",
      "Create an AWS Budgets cost budget with a forecasted alert threshold and an Amazon SNS notification.",
      "Create a daily granularity report in AWS Cost Explorer and review it every day."
    ],
    "correct": 2,
    "explanation":
      "AWS Budgets can trigger an alert on either actual or forecasted cost and can publish that alert to an Amazon SNS topic, which is the only option that notifies before the threshold is reached. The Cost and Usage Report delivers detailed billing data to Amazon S3 but has no alerting of its own, so a scheduled query still needs custom logic built around it. Trusted Advisor produces optimization recommendations, not a threshold on a custom amount. Cost Explorer visualizes and forecasts cost but does not send notifications when a threshold is crossed."
  },
  {
    "id": 409,
    "domain": 4,
    "ts": "4.2",
    "q": "A FinOps team must identify over-provisioned Amazon EC2 instances and obtain right-sizing recommendations that are based on observed utilization. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Create AWS Config rules that evaluate every instance type against a list of approved types.",
      "Opt in to AWS Compute Optimizer and review its Amazon EC2 instance recommendations.",
      "Build an Amazon CloudWatch dashboard of CPU utilization for every instance and review it manually.",
      "Query the AWS Cost and Usage Report in Amazon Athena to rank instances by cost."
    ],
    "correct": 1,
    "explanation":
      "AWS Compute Optimizer analyzes utilization metrics and returns right-sizing recommendations for EC2 instances, Auto Scaling groups, EBS volumes, Lambda functions, and ECS services on Fargate, with no analysis to build. AWS Config evaluates configuration against rules and reports compliance, so it can flag an unapproved instance type but never says an instance is too large for its load. A CloudWatch dashboard shows the raw metrics and leaves every sizing decision to a person. The Cost and Usage Report ranks spend but says nothing about whether a resource is over-provisioned."
  },
  {
    "id": 410,
    "domain": 4,
    "ts": "4.3",
    "q": "A non-production Amazon RDS for MySQL DB instance is needed only during business hours on weekdays. The company wants to eliminate the DB instance compute charges outside those hours while keeping the data and the endpoint. Which solution will meet these requirements?",
    "options": [
      "Modify the DB instance to a smaller instance class every night by using a scheduled script, and modify it back to the original class again each morning.",
      "Convert the DB instance to a Multi-AZ deployment, and direct the night-time application traffic to the standby instance in the second Availability Zone.",
      "Create an Amazon EventBridge schedule that invokes an AWS Lambda function to stop the DB instance in the evening and start it in the morning.",
      "Create a snapshot every evening, delete the DB instance afterwards, and restore that snapshot again every morning before business hours start."
    ],
    "correct": 2,
    "explanation":
      "A stopped RDS DB instance is not charged for DB instance hours, and it keeps its instance identifier, DNS endpoint, parameter group, and security group, so an EventBridge schedule that drives a Lambda function to stop and start it removes the compute charge without changing anything else. RDS restarts a DB instance automatically after 7 consecutive stopped days, which a weekday schedule never reaches. A smaller instance class is still billed for every hour it runs. A Multi-AZ standby is not a readable endpoint and adds cost rather than removing it. Deleting and restoring the DB instance every day discards the automated backups and adds restore time and risk."
  },
  {
    "id": 411,
    "domain": 4,
    "ts": "4.2",
    "q": "A backend application receives a few thousand requests each day in irregular bursts. The application runs continuously on a single Amazon EC2 instance that is idle most of the time. The company wants to pay only when requests are processed. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Purchase a 1-year Reserved Instance that covers the existing instance type.",
      "Move the application to a smaller On-Demand instance type.",
      "Move the application to an Amazon ECS service that uses an Amazon EC2 capacity provider.",
      "Move the application to AWS Lambda behind Amazon API Gateway."
    ],
    "correct": 3,
    "explanation":
      "AWS Lambda charges for the number of requests and for how long each invocation runs, so an application that is idle most of the day incurs no compute charge between bursts, and API Gateway is also billed per request. A Reserved Instance locks in payment for capacity that stays idle. A smaller instance type reduces the hourly rate but is still billed every hour of every day. An ECS service on an EC2 capacity provider keeps the container instances running and billable regardless of traffic."
  },
  {
    "id": 412,
    "domain": 4,
    "ts": "4.4",
    "q": "A static website serves images and video from an Amazon S3 bucket to users around the world. Data transfer out of Amazon S3 is expensive and latency varies by Region. Which solution will reduce the transfer cost and improve performance?",
    "options": [
      "Create an Amazon CloudFront distribution that uses the S3 bucket as its origin.",
      "Turn on S3 Transfer Acceleration on the bucket.",
      "Configure S3 Cross-Region Replication to a bucket in every AWS Region.",
      "Change the storage class of the bucket contents to S3 One Zone-IA."
    ],
    "correct": 0,
    "explanation":
      "CloudFront caches objects at edge locations near the users, so repeat requests are answered from the cache instead of the origin. That cuts latency and cuts the volume of data served directly out of Amazon S3, which is what the bill is measuring. S3 Transfer Acceleration routes transfers over the edge network for an additional per-GB fee and is aimed at uploads over long distances. Replicating the bucket to every Region multiplies storage cost and replication traffic. S3 One Zone-IA changes the storage rate and reduces resilience to the loss of an Availability Zone, but data transfer out is billed the same."
  },
  {
    "id": 413,
    "domain": 4,
    "ts": "4.1",
    "q": "An administrator reviews the gp2 Amazon EBS volumes that are attached to a fleet of EC2 instances and finds that the default performance is sufficient. The company wants to lower the price paid per GiB without losing performance. Which solution will meet these requirements?",
    "options": [
      "Modify the volumes to the io2 Provisioned IOPS volume type.",
      "Modify the volumes to the st1 volume type.",
      "Increase the size of the gp2 volumes.",
      "Modify the volumes to the gp3 volume type."
    ],
    "correct": 3,
    "explanation":
      "gp3 volumes are priced 20 percent lower per GiB than gp2 volumes and deliver a baseline of 3,000 IOPS and 125 MiB/s that is included in the storage price and independent of volume size, so performance is at least equivalent. Elastic Volumes applies the change without detaching the volume or stopping the instance. io2 is a Provisioned IOPS SSD priced for latency-sensitive, high-IOPS workloads and costs more. st1 is a throughput-optimized HDD that is not suitable where an SSD is in use. Enlarging a gp2 volume raises gp2 baseline IOPS but also raises the bill, which is the opposite of the goal."
  },
  {
    "id": 414,
    "domain": 4,
    "ts": "4.1",
    "q": "A company has accumulated hundreds of Amazon EBS snapshots over several years. Many of them belong to deleted volumes or are obsolete. The company wants snapshot retention and deletion to be enforced continuously without manual work. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Create Amazon Data Lifecycle Manager policies that define the snapshot schedule and the retention rules.",
      "Turn on encryption for all of the existing snapshots using a customer managed AWS KMS key instead of the account default key.",
      "Copy the snapshots into an Amazon S3 bucket that has a lifecycle rule moving them to S3 Glacier Deep Archive.",
      "Register every snapshot as an AMI, and deregister those AMIs once a year during a manually scheduled cleanup review."
    ],
    "correct": 0,
    "explanation":
      "Amazon Data Lifecycle Manager creates, retains, and deletes EBS snapshots according to policy, so obsolete snapshots are removed continuously without anyone running a script. Encrypting snapshots changes nothing about how much storage they consume. EBS snapshots are not exposed as objects in a customer bucket, so S3 Lifecycle rules cannot manage them; the low-cost tier for rarely used snapshots is the EBS Snapshots Archive tier. Registering AMIs adds another object that references the same snapshot data, and the underlying snapshot storage is still billed."
  },
  {
    "id": 415,
    "domain": 4,
    "ts": "4.3",
    "q": "A development database has very intermittent and unpredictable load, with long idle periods followed by sudden spikes. The company does not want to pay for a fixed baseline capacity. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Deploy an Amazon RDS DB instance on a db.r5.large instance class covered by a Reserved Instance.",
      "Deploy an Amazon DynamoDB table in provisioned capacity mode with reserved capacity.",
      "Deploy an Amazon Redshift provisioned cluster.",
      "Deploy an Amazon Aurora Serverless v2 DB cluster."
    ],
    "correct": 3,
    "explanation":
      "Aurora Serverless v2 adjusts database capacity in fine-grained increments in response to the workload and scales back down when the load disappears, so the bill follows the spikes instead of a fixed baseline. An RDS Reserved Instance is a commitment to a specific instance class running continuously, which is the baseline the company wants to avoid. DynamoDB in provisioned capacity mode with reserved capacity commits to a throughput baseline for the term. An Amazon Redshift provisioned cluster is a data warehouse whose nodes are billed continuously and is oversized for a development database."
  },
  {
    "id": 416,
    "domain": 4,
    "ts": "4.2",
    "q": "A company wants billing data broken down to the level of individual resources and tags, delivered to Amazon S3, and queried with Amazon Athena for custom FinOps reports. Which solution provides the MOST granular data?",
    "options": [
      "Export a report out of AWS Cost Explorer every month, and save the file for the finance team.",
      "Create an AWS Budgets report for each of the teams, and configure it to notify the team by email.",
      "Turn on AWS Cost Anomaly Detection, and export all of the findings that it produces.",
      "Create an AWS Cost and Usage Report that is delivered to an Amazon S3 bucket."
    ],
    "correct": 3,
    "explanation":
      "The AWS Cost and Usage Report is the most detailed billing dataset AWS publishes: one row per line item, with resource identifiers and activated cost allocation tags, delivered on a schedule to an Amazon S3 bucket and directly queryable from Amazon Athena. Cost Explorer exports aggregated views and does not carry per-resource line items. AWS Budgets reports summarize budget status. Cost Anomaly Detection flags unusual spend changes rather than providing a full billing dataset."
  },
  {
    "id": 417,
    "domain": 4,
    "ts": "4.2",
    "q": "A containerized application runs on Amazon ECS with AWS Fargate. It has a predictable baseline load plus occasional spikes, and the tasks that serve the spikes tolerate interruption. The company wants to minimize compute cost without managing servers. Which combination of steps will meet these requirements MOST cost-effectively? (Select TWO.)",
    "multi": true,
    "options": [
      "Purchase a Compute Savings Plan to cover the baseline Fargate usage.",
      "Purchase Standard Reserved Instances to cover the Fargate usage.",
      "Run the spike tasks with the Fargate Spot capacity provider.",
      "Add an Amazon EC2 Auto Scaling capacity provider sized for the peak load.",
      "Run every task on Fargate On-Demand capacity with no commitment."
    ],
    "correct": [0, 2],
    "explanation":
      "Compute Savings Plans apply to AWS Fargate usage in exchange for a commitment to a consistent hourly spend, which is a good fit for a predictable baseline. Fargate Spot runs interruption-tolerant tasks on spare capacity at a rate discounted compared to the Fargate price and sends a two-minute warning before stopping a task, which covers the spikes. Reserved Instances apply to Amazon EC2 instance usage and never to Fargate. An EC2 capacity provider sized for the peak means paying for and operating servers, which contradicts the requirement. Running everything on Fargate On-Demand with no commitment leaves the baseline at the undiscounted rate."
  },
  {
    "id": 418,
    "domain": 4,
    "ts": "4.1",
    "q": "A company must retain backups for 10 years to satisfy a regulation. The backups are expected never to be read, but during an audit a retrieval time of up to 48 hours is acceptable. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Store the backups in S3 Glacier Instant Retrieval.",
      "Store the backups in S3 Standard-IA.",
      "Store the backups in S3 Glacier Deep Archive.",
      "Store the backups in S3 Glacier Flexible Retrieval."
    ],
    "correct": 2,
    "explanation":
      "S3 Glacier Deep Archive is the lowest-cost S3 storage class and is designed for archive data accessed less than once a year, with Standard retrieval finishing within 12 hours and Bulk retrieval within 48 hours, both inside the stated window. Its 180-day minimum storage duration is irrelevant against a 10-year retention. S3 Glacier Instant Retrieval is priced for millisecond access that is not needed here, and S3 Glacier Flexible Retrieval is priced for archives that may be needed in minutes to hours; both cost more per GB than Deep Archive. S3 Standard-IA is priced for data still read about once a month, which is far more than these backups will ever be read."
  },
  {
    "id": 419,
    "domain": 4,
    "ts": "4.2",
    "q": "A workload runs licensed software under a BYOL agreement that is tied to the physical server and requires visibility of the sockets and physical cores. The company wants to minimize cost while satisfying that constraint. Which solution will meet these requirements?",
    "options": [
      "Launch the workload on Dedicated Instances instead, which run on hardware dedicated to the account but managed by AWS.",
      "Launch the workload on a Dedicated Host that is covered by a Dedicated Host Reservation.",
      "Launch the workload on Spot Instances that run inside a diversified Spot Fleet of several types.",
      "Launch the workload on shared-tenancy On-Demand Instances, which place it on hardware shared with other accounts."
    ],
    "correct": 1,
    "explanation":
      "A Dedicated Host is a physical server fully dedicated to the account, and it exposes the sockets and physical cores and allows instances to be placed on a known host, which is what per-socket and per-core BYOL agreements require. A Dedicated Host Reservation commits to that host for a 1-year or 3-year term at a lower rate than On-Demand Dedicated Host usage. Dedicated Instances also run on single-tenant hardware but do not expose the underlying sockets and cores or give control over instance placement on a specific host. Spot Instances can be reclaimed at any time. Shared tenancy does not provide the hardware dedication the license requires."
  },
  {
    "id": 420,
    "domain": 4,
    "ts": "4.2",
    "q": "A company suspects that unused resources such as unattached Elastic IP addresses, idle load balancers, and underutilized EBS volumes are inflating its bill. The company wants recommendations that identify this waste without building custom tooling. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Review the AWS Trusted Advisor cost optimization checks.",
      "Query AWS CloudTrail events to find resources that are never called.",
      "Run Amazon Inspector assessments across the accounts.",
      "Build an AWS Systems Manager Inventory report of all resources."
    ],
    "correct": 0,
    "explanation":
      "The cost optimization category of AWS Trusted Advisor already checks for idle load balancers, unassociated Elastic IP addresses, underutilized EBS volumes, and other unused resources, and presents them with the estimated saving, so there is nothing to build. CloudTrail records API activity, and absence of API calls does not prove a resource is idle. Amazon Inspector assesses software vulnerabilities and unintended network exposure, not cost. Systems Manager Inventory catalogs software and configuration on managed nodes without evaluating whether a resource is worth keeping."
  },
  {
    "id": 421,
    "domain": 4,
    "ts": "4.1",
    "q": "An application writes millions of small objects to S3 Standard. Each object is processed and is no longer needed after about 10 days. A team member proposes a lifecycle rule that transitions the objects to S3 Standard-IA after 7 days. Which solution will meet the retention need MOST cost-effectively?",
    "options": [
      "Transition the objects to S3 Standard-IA after 7 days and expire them after 10 days.",
      "Keep the objects in S3 Standard and add a lifecycle rule that expires them after 10 days.",
      "Transition the objects to S3 One Zone-IA after 7 days and expire them after 10 days.",
      "Transition the objects to S3 Glacier Instant Retrieval after 7 days and expire them after 10 days."
    ],
    "correct": 1,
    "explanation":
      "S3 Standard has no minimum storage duration and no minimum billable object size, so expiring the objects at day 10 with a lifecycle rule pays for exactly 10 days of storage and nothing else. The proposed transition costs more, not less: S3 Standard-IA and S3 One Zone-IA bill a 30-day minimum storage duration and a 128 KB minimum billable object size per object, so an object deleted on day 10 is still charged for the rest of the 30 days, and each transition is a billable request across millions of objects. S3 Glacier Instant Retrieval is worse again with a 90-day minimum storage duration. Lifecycle configurations also do not transition objects smaller than 128 KB by default, so for very small objects the rule would not even apply."
  },
  {
    "id": 422,
    "domain": 4,
    "ts": "4.4",
    "q": "A cost review shows large EC2-Other data transfer charges. Two chatty microservices running on EC2 instances exchange terabytes of traffic across Availability Zones in the same Region. The company accepts reduced Availability Zone redundancy for these two services. What should a solutions architect recommend?",
    "options": [
      "Place both services in the same Availability Zone and have them communicate over their private IPv4 addresses.",
      "Have the two services communicate with each other over their public IPv4 addresses, billed at the internet data transfer rate.",
      "Route the traffic between the two services through the internet gateway of the VPC, using the public IPv4 address of each instance.",
      "Route the traffic between the two services through a NAT gateway that is deployed in each of the Availability Zones."
    ],
    "correct": 0,
    "explanation":
      "Data transferred between Availability Zones in the same Region is charged in both directions, while traffic exchanged between instances in the same Availability Zone over private IPv4 addresses is not charged, so co-locating the two chatty services removes the charge entirely. The company has explicitly accepted the trade-off, which is that both services now fail together if that Availability Zone becomes unavailable. Communicating over public IPv4 addresses or through an internet gateway pushes the traffic onto a public path that is billed at a higher rate. A NAT gateway adds an hourly charge plus a per-GB data processing charge on top of the transfer, so it increases the bill."
  },
  {
    "id": 423,
    "domain": 4,
    "ts": "4.2",
    "q": "A fault-tolerant big data workload runs on a fleet of Spot Instances that requests a single instance type in a single Availability Zone. The fleet suffers frequent simultaneous interruptions. Which solution will reduce the interruptions while keeping the Spot discount?",
    "options": [
      "Request all of the fleet capacity from whichever single Spot capacity pool currently advertises the lowest Spot price anywhere in the Region.",
      "Replace all of the Spot Instances in the fleet with On-Demand Instances.",
      "Configure the fleet with many instance types across multiple Availability Zones and use the price-capacity-optimized allocation strategy.",
      "Request only the largest available instance type across all of the Availability Zones in the Region, keeping the fleet limited to that single instance family."
    ],
    "correct": 2,
    "explanation":
      "A Spot capacity pool is the set of unused instances of one instance type in one Availability Zone, so a fleet pinned to a single type in a single Availability Zone draws from exactly one pool and every instance is reclaimed together. Adding instance types and Availability Zones spreads the fleet over many pools, and the price-capacity-optimized allocation strategy launches from the pools with the most available capacity among the lowest-priced ones, which lowers the interruption rate while keeping the Spot price. Concentrating on the single cheapest pool maximizes the risk of a simultaneous reclaim. Moving to On-Demand removes the interruptions but also removes the discount. Restricting the request to one large instance type still leaves one pool per Availability Zone, and the largest sizes usually have the least spare capacity."
  },
  {
    "id": 424,
    "domain": 4,
    "ts": "4.1",
    "q": "Compliance archives are stored in S3 Glacier Flexible Retrieval. Routine retrievals can take hours, but during an incident investigation the security team occasionally needs a small number of archives within minutes. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Copy all of the compliance archives to S3 Standard storage instead, and keep every one of them there going forward.",
      "Transition all of the archives to S3 Glacier Deep Archive and use Expedited retrievals when an investigation starts.",
      "Keep the archives in S3 Glacier Flexible Retrieval and use Expedited retrievals only for the urgent requests.",
      "Transition all of the archives to S3 Glacier Instant Retrieval, which charges a higher storage rate than Flexible Retrieval."
    ],
    "correct": 2,
    "explanation":
      "S3 Glacier Flexible Retrieval offers three retrieval options: Expedited, where objects under 250 MB are typically available in 1 to 5 minutes, Standard, which typically finishes in 3 to 5 hours, and Bulk, which typically finishes in 5 to 12 hours. Paying the Expedited premium only on the handful of urgent objects leaves the storage rate untouched. Expedited retrieval is not available for S3 Glacier Deep Archive, whose fastest option is Standard within 12 hours, so that option cannot satisfy the minutes requirement at all. Copying everything to S3 Standard multiplies the storage rate for data that is almost never read. S3 Glacier Instant Retrieval would give millisecond access but charges a higher storage rate for every archived object when only a few are ever urgent."
  },
  {
    "id": 425,
    "domain": 4,
    "ts": "4.2",
    "q": "A FinOps team wants AWS costs broken down by Project and by Team in AWS Cost Explorer and in the AWS Cost and Usage Report. The resources already carry Project and Team tags, but those tags do not appear as billing dimensions. What should a solutions architect do to accomplish this?",
    "options": [
      "Recreate the resources so that the tags are applied when each resource is created.",
      "Activate Project and Team as user-defined cost allocation tags in the Billing and Cost Management console.",
      "Rename the tag keys to lowercase so that the billing tools recognize them.",
      "Attach an AWS Organizations tag policy that requires the two tag keys on every resource."
    ],
    "correct": 1,
    "explanation":
      "A user-defined tag becomes a billing dimension only after it is activated as a cost allocation tag in the Billing and Cost Management console, and the activation applies to usage recorded from that point forward rather than retroactively. Recreating the resources changes nothing, because the tags are already attached. Tag keys are case sensitive, but there is no requirement that they be lowercase for activation to work. A tag policy standardizes which tag keys and values are allowed across accounts and reports non-compliance, but it does not activate anything for cost allocation."
  },
  {
    "id": 426,
    "domain": 4,
    "ts": "4.3",
    "q": "An Amazon DynamoDB table serves steady, predictable traffic of about 8,000 reads per second and 2,000 writes per second around the clock. The table uses on-demand capacity mode and the monthly bill is high. Which solution will reduce the cost?",
    "options": [
      "Add a global secondary index to the table so that the read traffic is spread across two separate indexes.",
      "Turn on point-in-time recovery for the table itself, which restores it to any second in the preceding 35 days.",
      "Switch the table to provisioned capacity mode and configure auto scaling on its read and write capacity.",
      "Turn on DynamoDB Streams, and process part of the traffic asynchronously through a Lambda function that consumes the stream records."
    ],
    "correct": 2,
    "explanation":
      "On-demand capacity mode charges per read request unit and per write request unit and is priced for traffic that cannot be forecast. When the throughput is steady and known, provisioned capacity mode costs less per unit of throughput, and auto scaling adjusts the provisioned values so headroom is not wasted. A global secondary index adds storage and consumes extra write capacity for every item written, so it increases cost. Point-in-time recovery is a chargeable backup feature. DynamoDB Streams adds a read request charge for the stream and does not change how the table's own traffic is billed."
  },
  {
    "id": 427,
    "domain": 4,
    "ts": "4.2",
    "q": "An AWS Lambda function is configured with 10,240 MB of memory. Monitoring shows the function uses at most 400 MB and spends most of its duration waiting on external API calls. The company wants to reduce the cost of the function without changing its behavior. Which solution will meet these requirements?",
    "options": [
      "Reduce the configured memory to a value slightly above the observed usage, such as 512 MB.",
      "Increase the configured timeout of the function instead, leaving its memory setting at 10,240 MB.",
      "Package the function as a container image instead of a .zip archive built from the same code.",
      "Configure provisioned concurrency for the function itself, which keeps execution environments initialized and billed."
    ],
    "correct": 0,
    "explanation":
      "Lambda charges are based on the memory configured for the function and on how long each invocation runs, and Lambda allocates CPU in proportion to the configured memory. A function that spends its time waiting on network calls gains nothing from the extra CPU that 10,240 MB buys, so lowering the setting toward the observed usage lowers the rate charged for every invocation without changing the duration. Memory can be set anywhere between 128 MB and 10,240 MB, and AWS Compute Optimizer can recommend a value. The timeout is only an upper bound on the duration and is not itself billed. The packaging format does not change how the function is priced. Provisioned concurrency adds a charge for keeping execution environments initialized."
  },
  {
    "id": 428,
    "domain": 4,
    "ts": "4.1",
    "q": "A company retains hundreds of Amazon EBS snapshots for 2 years to satisfy a compliance requirement. The snapshots are almost never restored, and snapshot storage cost keeps growing. Which solution will reduce the cost while keeping the snapshots restorable?",
    "options": [
      "Delete every snapshot that is older than 30 days.",
      "Copy every snapshot to a second AWS Region.",
      "Register every snapshot as an AMI and delete the original snapshots.",
      "Move the snapshots to the Amazon EBS Snapshots Archive tier."
    ],
    "correct": 3,
    "explanation":
      "Amazon EBS Snapshots Archive offers up to 75 percent lower snapshot storage cost for snapshots that are kept 90 days or longer and rarely accessed, which describes a 2-year compliance copy exactly. The trade-off is that an archived snapshot must first be restored to the standard tier before it can be used, which can take up to 72 hours, and the minimum archive period is 90 days. Deleting snapshots after 30 days breaks the 2-year retention requirement. Copying each snapshot to another Region creates a second billable copy. Registering an AMI does not remove the underlying snapshot data, which is what the storage charge is based on."
  },
  {
    "id": 429,
    "domain": 4,
    "ts": "4.1",
    "q": "An audit finds that every Amazon CloudWatch log group still uses the default Never expire retention setting. The company needs 30 days of logs that are searchable in CloudWatch Logs, plus long-term copies for compliance. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Set a 30-day retention period on the log groups and deliver older log data to Amazon S3, with lifecycle rules that transition it to an archival storage class.",
      "Keep the Never expire retention setting on all of the log groups, and rely on CloudWatch Logs Insights queries to find whatever the compliance team happens to need.",
      "Set a 30-day retention period on the log groups, and accept the loss of the older log data, which CloudWatch Logs permanently deletes once the new expiration setting takes effect.",
      "Create a second log group in another AWS Region, and replicate every log event into it."
    ],
    "correct": 0,
    "explanation":
      "CloudWatch Logs charges for ingested data and for the log data it stores, so capping retention at 30 days bounds the expensive tier at exactly the searchable window the company needs, while exporting or subscribing older log data to Amazon S3 and applying lifecycle transitions to the S3 Glacier classes keeps the compliance copies at a far lower storage rate. Leaving Never expire in place is the problem being fixed. Setting the retention alone deletes the very data the compliance requirement calls for. Replicating log events into a second Region multiplies the ingestion charge instead of reducing it."
  },
  {
    "id": 430,
    "domain": 4,
    "ts": "4.1",
    "q": "A genomics company hosts a multi-petabyte public dataset in Amazon S3. External research partners download the data heavily, and the company wants the downloaders to bear the request and data transfer charges. Which solution will meet these requirements?",
    "options": [
      "Turn on S3 Transfer Acceleration on the bucket that holds the public genomics dataset.",
      "Turn on Requester Pays on the bucket and require every requester to authenticate.",
      "Grant anonymous public read access to the whole bucket, using a bucket policy that allows s3:GetObject broadly.",
      "Change the storage class of the whole dataset to S3 One Zone-IA, stored in a single Availability Zone."
    ],
    "correct": 1,
    "explanation":
      "With a Requester Pays bucket, the requester pays for the request and for the data download while the bucket owner continues to pay only for storing the data. Every request must be authenticated so that S3 can identify who to charge, and it must carry the x-amz-request-payer header or the RequestPayer parameter; anonymous access to a Requester Pays bucket is not allowed. S3 Transfer Acceleration adds a per-GB fee that the owner pays. Anonymous public read leaves every request and transfer charge with the owner. S3 One Zone-IA changes the storage rate and the resilience of the data, not who pays for the transfer."
  },
  {
    "id": 431,
    "domain": 4,
    "ts": "4.2",
    "q": "A company runs about 60 development and test Amazon EC2 instances that are needed only on weekdays during business hours, and several of them are over-provisioned. Which combination of steps will reduce the cost the MOST? (Select TWO.)",
    "multi": true,
    "options": [
      "Enable Multi-AZ deployments for the development databases so that the environment survives the loss of an Availability Zone without an administrator restoring it.",
      "Migrate all of the instances to Dedicated Hosts so that they are billed per host rather than per instance.",
      "Stop the instances outside business hours with an Amazon EventBridge schedule that invokes an AWS Systems Manager Automation runbook.",
      "Change every instance to the largest available instance type in its family so that each one finishes its work sooner and can be stopped earlier.",
      "Resize the over-provisioned instances according to the AWS Compute Optimizer recommendations."
    ],
    "correct": [2, 4],
    "explanation":
      "Stopped EC2 instances are not charged for instance hours, so a schedule that stops them on evenings and weekends removes most of the week's compute charge for a fleet that is only needed on weekdays during business hours. Resizing the over-provisioned instances on the basis of Compute Optimizer's utilization analysis removes the premium paid for capacity that is never used, and the two actions compound. Multi-AZ adds a standby and increases the cost of development databases. Dedicated Hosts are the most expensive tenancy and address licensing constraints, not cost. Moving every instance to the largest type in its family increases the hourly rate across the entire fleet."
  },
  {
    "id": 432,
    "domain": 4,
    "ts": "4.1",
    "q": "A company archives sensor readings to Amazon S3. Each reading is stored as its own object of about 15 KB, and the bucket holds several billion of them. An S3 Lifecycle rule transitions the objects to S3 Glacier Deep Archive after 30 days, and the readings are never retrieved except during an annual audit. After the rule took effect the monthly S3 bill increased instead of falling. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Change the lifecycle rule so that it transitions each one of the objects to S3 Glacier Instant Retrieval after 30 days instead.",
      "Change the lifecycle rule so that it transitions the objects to the S3 One Zone-IA storage class after 30 days instead of to S3 Glacier Deep Archive.",
      "Aggregate each day of readings into a single large object before the lifecycle rule transitions it to S3 Glacier Deep Archive.",
      "Move the objects to the S3 Intelligent-Tiering storage class, and enable its optional Archive Access and Deep Archive Access tiers for the bucket."
    ],
    "correct": 2,
    "explanation":
      "Every object transitioned to S3 Glacier Flexible Retrieval or S3 Glacier Deep Archive carries about 40 KB of per-object overhead: 8 KB for the object name and metadata billed at S3 Standard rates, plus 32 KB of index and metadata billed at the archive class rate. On 15 KB objects that overhead is larger than the data itself, so archiving billions of them raises the bill. Aggregating a day of readings into one large object removes the per-object overhead and lets the archive rate apply to the data. S3 Glacier Instant Retrieval and S3 One Zone-IA have a 128 KB minimum billable object size, so 15 KB objects are billed as 128 KB in either class. S3 Intelligent-Tiering never moves objects smaller than 128 KB to the archive access tiers, so the readings would stay in the frequent access tier and only add monitoring charges."
  },
  {
    "id": 433,
    "domain": 4,
    "ts": "4.1",
    "q": "A company stores data in more than 600 Amazon S3 buckets spread across 40 accounts in an AWS Organizations organization. The finance team cannot tell which buckets are growing fastest or where storage spend is concentrated, and a recent audit found buckets accumulating incomplete multipart uploads that are still billed as storage. A solutions architect must provide a single organization-wide view of storage usage and act on the largest immediate saving. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Create an organization-level Amazon S3 Storage Lens dashboard from the management account, with advanced metrics and recommendations activated.",
      "Turn on S3 server access logging for every bucket, and analyze the log files with Amazon Athena to attribute the storage growth to the accounts that caused it.",
      "Turn on Amazon S3 Inventory for every bucket, and compare the daily reports by hand to find the buckets that are growing fastest.",
      "Add an S3 Lifecycle rule to each bucket that deletes incomplete multipart uploads after a defined number of days.",
      "Turn on S3 Versioning for every bucket so that the growth of each object can be tracked from its version history over time."
    ],
    "correct": [0, 3],
    "explanation":
      "S3 Storage Lens is the cloud-storage analytics feature designed for organization-wide visibility into object storage usage and activity, and an organization-level dashboard created from the management account aggregates all member accounts in one place; advanced metrics add the recommendations that identify cost-optimization opportunities, such as buckets with no rule to expire incomplete multipart uploads. Adding that lifecycle rule then removes storage that is billed but unusable. Server access logging records requests, not storage footprint, and it creates yet more objects to pay for. S3 Inventory produces per-bucket object listings that would have to be correlated manually across 600 buckets, which is exactly the work Storage Lens does for you. S3 Versioning is a data-protection feature that keeps previous object versions, so it increases storage cost rather than revealing it."
  },
  {
    "id": 434,
    "domain": 4,
    "ts": "4.1",
    "q": "A company runs a shared content repository on an Amazon EFS file system. Analysis shows that most files are read heavily during the first few weeks after upload and then are almost never opened again, although they must stay online and immediately readable. The file system must remain resilient to the loss of an Availability Zone. Storage charges have grown steadily as the repository has accumulated years of content. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Recreate the repository as an EFS One Zone file system, and copy the data across to it with AWS DataSync, configuring a task whose destination location is the new one-zone file system.",
      "Change the file system to Provisioned Throughput mode, and set a low provisioned throughput value.",
      "Migrate the repository to an Amazon EBS volume that is attached to a single Amazon EC2 instance which exports the file system to all of the clients over NFS from one Availability Zone.",
      "Configure EFS lifecycle policies so that files not accessed for 30 days move to the EFS Infrequent Access storage class and colder files move to the EFS Archive storage class."
    ],
    "correct": 3,
    "explanation":
      "EFS lifecycle management transitions files between storage classes based on when they were last accessed in the Standard class. A transition-into-IA policy moves files that go untouched for 30 days into EFS Infrequent Access, and a transition-into-Archive policy moves colder files into EFS Archive, which is cost-optimized for data accessed only a few times a year. The files stay in the same file system and remain immediately readable. An EFS One Zone file system stores data in a single Availability Zone, which directly violates the resilience requirement. Provisioned Throughput changes how throughput is billed and does nothing to the storage rate that is actually growing. Moving to a single EBS volume behind one EC2 instance replaces a managed, multi-AZ file system with a single point of failure and adds an instance to pay for."
  },
  {
    "id": 435,
    "domain": 4,
    "ts": "4.1",
    "q": "An organization keeps 200 TB of engineering documents on an aging on-premises NAS appliance that is nearly full. Applications must keep reaching those documents over SMB, with local read latency for the files used most recently. The organization wants to stop buying disk shelves and hold the bulk of the data in Amazon S3, where S3 Lifecycle rules can archive the oldest documents. Which solution meets these requirements?",
    "options": [
      "Deploy an Amazon S3 File Gateway on premises and present the documents as an SMB file share backed by an S3 bucket, with a local cache for recently accessed files.",
      "Deploy a Tape Gateway on premises and write the documents to virtual tapes that are stored in S3 Glacier.",
      "Deploy a Volume Gateway in stored volume mode so that a full copy of every volume remains on premises and is backed up asynchronously to Amazon S3.",
      "Use AWS DataSync to copy the documents to Amazon S3 once, then delete them from the NAS appliance."
    ],
    "correct": 0,
    "explanation":
      "Amazon S3 File Gateway gives on-premises applications an NFS or SMB interface onto an S3 bucket: files are stored as S3 objects that lifecycle rules can then transition, while a local cache keeps recently accessed files available at local latency, so the on-premises footprint shrinks to the cache. A Tape Gateway presents a virtual tape library for backup applications; it does not provide a file share that applications can read from. Volume Gateway in stored volume mode deliberately keeps the full data set on premises and uses S3 only for backup, so the appliance stays full. DataSync moves the data efficiently but leaves no file interface behind, so the applications would lose their SMB access to the documents."
  },
  {
    "id": 436,
    "domain": 4,
    "ts": "4.1",
    "q": "A company protects several Amazon EFS file systems with AWS Backup. The backup plan keeps every recovery point in warm storage for seven years to satisfy an auditor. Restores are requested at most once a year, and the business accepts that such a restore may take several hours to complete. The backup vault has become one of the largest lines on the monthly bill. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Reduce the backup frequency from daily to weekly, and keep the seven-year warm retention.",
      "Copy each recovery point to a backup vault in a second AWS Region, and delete the original recovery point, using a cross-Region copy action defined within the same AWS Backup plan.",
      "Add a lifecycle rule to the backup plan that moves recovery points to cold storage after a set number of days, with a deletion date at least 90 days after that transition.",
      "Restore each of the recovery points to an Amazon S3 bucket, and apply an S3 Lifecycle rule that transitions the restored data to S3 Glacier Deep Archive after a few days have passed."
    ],
    "correct": 2,
    "explanation":
      "AWS Backup lifecycle rules transition recovery points of supported resource types, including Amazon EFS, from warm storage to much cheaper cold storage. Recovery points must remain in cold storage for a minimum of 90 days, which is why the retention setting has to be at least 90 days greater than the transition setting; a seven-year retention leaves ample room. Reducing the backup frequency changes the recovery point objective, which is a protection decision the auditor drives, not a storage-tier decision. Copying to a second Region adds cross-Region transfer and a second vault to pay for. AWS Backup recovery points are not objects that can be dropped into a bucket and lifecycled; restoring them all would create a separate, unmanaged copy of the data and would not reduce the vault cost."
  },
  {
    "id": 437,
    "domain": 4,
    "ts": "4.2",
    "q": "A company runs a steady production workload on 40 EC2 instances of a single instance family in one AWS Region. The family and the Region have not changed in two years and are not expected to change, and the company is prepared to commit for three years to obtain the deepest available discount. The company runs no AWS Fargate or AWS Lambda workloads and has no plans to add any. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Purchase a Compute Savings Plan for the equivalent hourly commitment.",
      "Purchase Convertible Reserved Instances that cover the 40 instances.",
      "Purchase an EC2 Instance Savings Plan for that instance family in that Region.",
      "Create On-Demand Capacity Reservations for the 40 instances in that Region."
    ],
    "correct": 2,
    "explanation":
      "An EC2 Instance Savings Plan commits to usage of a specific instance family in a specific Region and, in exchange for that reduced flexibility, offers a larger discount than a Compute Savings Plan for the same commitment. A Compute Savings Plan applies regardless of instance family, size, operating system, tenancy, or Region and also covers Fargate and Lambda usage, which is flexibility this company explicitly does not need and would be paying for. Convertible Reserved Instances give up part of the discount to allow attribute changes over the term, again buying flexibility that is not required. On-Demand Capacity Reservations reserve capacity in an Availability Zone but provide no discount on their own; they are billed at On-Demand rates."
  },
  {
    "id": 438,
    "domain": 4,
    "ts": "4.2",
    "q": "A retailer's Amazon EC2 fleet supports a business that peaks for one week at the end of every month. AWS Compute Optimizer marks many of the instances as over-provisioned, but the platform team distrusts those findings because the default analysis window covers only the previous 14 days and can therefore miss the monthly peak entirely. The team wants right-sizing recommendations that are based on a longer history. Which solution meets these requirements?",
    "options": [
      "Activate the enhanced infrastructure metrics recommendation preference in Compute Optimizer so that the lookback period is extended to 93 days.",
      "Install the Amazon CloudWatch agent on all of the instances so that it publishes custom memory utilization metrics for the rightsizing analysis to use.",
      "Use the AWS Cost Explorer rightsizing recommendations for the fleet instead of AWS Compute Optimizer, and disable the Compute Optimizer service in the account.",
      "Increase the metric retention period of the EC2 namespace in Amazon CloudWatch."
    ],
    "correct": 0,
    "explanation":
      "Enhanced infrastructure metrics is a paid Compute Optimizer recommendation preference that extends the metrics analysis lookback period for the selected resources to 93 days, compared with the 14-day default, so a monthly peak is always inside the window the recommendation is computed from. Publishing memory metrics improves the accuracy of memory-based sizing but does nothing about the length of the analysis window, which is the stated problem. Cost Explorer rightsizing recommendations are themselves derived from Compute Optimizer and offer no longer window. CloudWatch metric retention is already far longer than 14 days and is not what limits the Compute Optimizer lookback period."
  },
  {
    "id": 439,
    "domain": 4,
    "ts": "4.2",
    "q": "An enterprise brings its own Microsoft SQL Server licenses to AWS. The license agreement is tied to physical cores, so the workloads must run on Amazon EC2 Dedicated Hosts, and the enterprise must be able to demonstrate during an audit that it never exceeded the number of cores it owns. Teams in several member accounts of an AWS Organizations organization launch these instances themselves. Which solution meets these requirements?",
    "options": [
      "Purchase license-included Amazon EC2 instances from AWS Marketplace, stop tracking the existing licenses, and keep the Dedicated Hosts only for the workloads that have not been migrated yet.",
      "Record the license assignments in AWS Systems Manager Inventory, have an administrator review the aggregated report from the organization every month, and reconcile the core counts against the purchase records before each audit is due.",
      "Create an AWS Config rule that flags any instance that is launched without a license tag, and deploy the rule as an organization rule across the member accounts.",
      "Create a self-managed license configuration in AWS License Manager with a core-based limit and enforcement enabled, associate it with the AMIs used for these workloads, and share it with the accounts through AWS Organizations."
    ],
    "correct": 3,
    "explanation":
      "AWS License Manager lets you express license terms as a license configuration, including core-based and socket-based limits, attach it to the AMIs teams launch from, enforce the limit at launch time across accounts through AWS Organizations, and report on consumption for an audit. It tracks licenses on EC2 instances, Dedicated Instances, and Dedicated Hosts. Buying license-included instances abandons licenses the enterprise has already paid for and increases the hourly rate. Systems Manager Inventory collects software inventory but does not model license entitlements or block a launch that would breach them, and a monthly review detects a breach long after it happened. An AWS Config rule evaluates configuration after the fact and checks a tag, not the number of cores actually consumed against the entitlement."
  },
  {
    "id": 440,
    "domain": 4,
    "ts": "4.2",
    "q": "A company runs short-lived containerized data-validation tasks. Each task runs for two to four minutes, tasks arrive a few dozen times a day at unpredictable moments, and nothing runs in between. The current Amazon ECS cluster is backed by an Auto Scaling group of EC2 instances that stay running around the clock so that a task can start immediately, and the team does not want to manage cluster capacity at all. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Keep the Auto Scaling group and purchase an EC2 Instance Savings Plan that matches the current instance family.",
      "Run the tasks on AWS Fargate so that capacity is provisioned per task and billed only while the task runs.",
      "Replace the Auto Scaling group with a smaller set of Reserved Instances and queue the tasks until capacity frees up.",
      "Move the cluster to Amazon EKS with a managed node group that scales on CPU utilization."
    ],
    "correct": 1,
    "explanation":
      "AWS Fargate provisions compute per task and bills for the resources the task requests only while it runs, which matches a workload that is idle almost all the time and removes cluster capacity management entirely. Buying an EC2 Instance Savings Plan discounts instances that sit idle almost all of the time, so it lowers the rate paid on waste rather than removing the waste. Reserved Instances have the same defect and add queueing delay on top. An EKS managed node group is still a fleet of EC2 instances the team must size and operate, and CPU-based node scaling reacts far too slowly for tasks that live two to four minutes."
  },
  {
    "id": 441,
    "domain": 4,
    "ts": "4.2",
    "q": "A media company runs a rendering platform on Amazon EC2. A baseline of 20 instances from a single instance family must run continuously for at least the next year to serve an interactive front end. On top of that baseline, overflow rendering jobs write checkpoints, can be restarted at any point, and run only when the job queue is deep. Finance wants the lowest possible annual compute cost. Which combination of steps should a solutions architect take? (Select TWO.)",
    "multi": true,
    "options": [
      "Purchase On-Demand Capacity Reservations for the overflow capacity so that the rendering jobs are never short of instances.",
      "Purchase an EC2 Instance Savings Plan that covers the 20-instance baseline for a one-year term.",
      "Purchase Standard Reserved Instances for a one-year term, sized for the combined baseline and peak rendering capacity.",
      "Run the interactive front end on Spot Instances, and run the overflow rendering jobs on On-Demand Instances that scale with the depth of the job queue.",
      "Run the overflow rendering jobs on Spot Instances in an Auto Scaling group that is configured with several instance types across multiple Availability Zones."
    ],
    "correct": [1, 4],
    "explanation":
      "The workload splits cleanly into a committed baseline and interruptible overflow. A one-year EC2 Instance Savings Plan discounts the 20 instances that are known to run continuously in a known family and Region, and Spot Instances are the cheapest way to run the checkpointed overflow, with several instance types across multiple Availability Zones so that a capacity reclamation in one pool does not remove the whole fleet at once. On-Demand Capacity Reservations reserve capacity at On-Demand rates and give no discount. Committing Standard Reserved Instances to the combined baseline and peak pays for peak capacity around the clock, so most of the commitment goes unused. Putting the interactive front end on Spot inverts the design: that tier cannot absorb an interruption, while the overflow jobs can."
  },
  {
    "id": 442,
    "domain": 4,
    "ts": "4.3",
    "q": "A SaaS provider runs a production Amazon Aurora PostgreSQL cluster whose load swings by a factor of twenty during the day and cannot be forecast. The cluster is currently provisioned for the observed peak and sits mostly idle. The database must stay available at all times, and capacity has to adjust in fine-grained increments without dropping client connections and without an operator changing the instance class. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Convert the cluster instances to Aurora Serverless v2 and set a minimum and maximum capacity range in Aurora capacity units.",
      "Keep the provisioned instances and use an AWS Lambda function to change the instance class on a schedule based on the time of day.",
      "Add Aurora Replicas that are sized for the peak and direct read traffic to the reader endpoint.",
      "Migrate the cluster to Amazon RDS for PostgreSQL with a Multi-AZ deployment on a burstable instance class."
    ],
    "correct": 0,
    "explanation":
      "Aurora Serverless v2 is an on-demand, auto-scaling configuration for Aurora that adjusts capacity in fine-grained Aurora capacity unit increments as demand changes, and bills only for the resources the cluster consumes, which is exactly the answer for a highly variable and unpredictable production workload that must stay online. Scheduling instance class changes with Lambda cannot follow an unpredictable curve, and each modification interrupts the instance. Adding Aurora Replicas sized for the peak increases cost and still leaves capacity provisioned for a peak that rarely occurs; it also does nothing for the write path. A burstable RDS instance accumulates and exhausts CPU credits, so a twentyfold swing would starve the database exactly when it is busiest, and it drops the Aurora storage architecture in the process."
  },
  {
    "id": 443,
    "domain": 4,
    "ts": "4.3",
    "q": "A company runs a production Amazon RDS for MySQL Multi-AZ deployment on a large memory-optimized instance class. Utilization has been flat for 18 months, the engine version and instance class are fixed by a vendor certification, and the company is willing to commit for three years. The company already holds a Compute Savings Plan that covers its Amazon EC2, AWS Fargate, and AWS Lambda usage. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Raise the hourly commitment on the existing Compute Savings Plan so that it also covers the RDS instance.",
      "Migrate the database to Aurora Serverless v2 so that the company pays only for capacity consumed.",
      "Purchase an EC2 Instance Savings Plan for the same instance family in the same Region.",
      "Purchase Reserved Instances for Amazon RDS that match the instance class, database engine, Region, and Multi-AZ deployment option."
    ],
    "correct": 3,
    "explanation":
      "An RDS Reserved Instance must match the instance class, engine, Region, and Multi-AZ deployment option of the running database, which is precisely what a configuration frozen by a vendor certification offers, so the full reserved discount applies for the whole three-year term. A Compute Savings Plan applies to Amazon EC2, AWS Fargate, and AWS Lambda usage, so raising its hourly commitment buys coverage the RDS instance can never consume and leaves an unused commitment to pay for. An EC2 Instance Savings Plan is scoped even more narrowly, to one EC2 instance family in one Region, and likewise never applies to a managed database instance. Aurora Serverless v2 pays off for variable or intermittent load; against a flat 18-month workload it is more expensive than a reserved provisioned instance, and the migration would break the vendor certification that fixes the engine."
  },
  {
    "id": 444,
    "domain": 4,
    "ts": "4.3",
    "q": "A startup is launching a consumer application on Amazon DynamoDB. Traffic cannot be forecast: the table may sit close to zero for hours and then take a tenfold increase within a minute when a marketing campaign is sent. The team has no historical capacity-planning data, does not want to pay for idle capacity between campaigns, and does not want to provision for peak and wants to minimize throttling during a spike. Which solution meets these requirements?",
    "options": [
      "Use provisioned capacity mode with table auto scaling and a low minimum capacity setting.",
      "Use on-demand capacity mode so that the table serves requests as they arrive without capacity planning.",
      "Use provisioned capacity mode with capacity set to the highest spike measured during load testing.",
      "Use provisioned capacity mode together with a DynamoDB Accelerator (DAX) cluster of nodes placed in front of the table to serve reads."
    ],
    "correct": 1,
    "explanation":
      "On-demand capacity mode charges per request and requires no capacity planning, so it fits a brand new workload with no usage history, long idle periods, and sudden bursts. Provisioned capacity with auto scaling reacts to CloudWatch alarms on consumed capacity, so it adjusts over several minutes; a tenfold jump inside one minute is throttled while auto scaling catches up, which the startup has ruled out. Provisioning for the highest measured spike removes the throttling but pays for peak capacity around the clock, which is the cost the team wants to avoid. DAX is a write-through cache that accelerates repeated reads; it does not protect the table from throttling on writes or on cache misses, and it adds a cluster of nodes billed by the hour. On-demand mode instantly accommodates up to double the previous peak traffic on a table, so a table that has been idle should have its warm throughput raised, or traffic ramped up, ahead of a campaign."
  },
  {
    "id": 445,
    "domain": 4,
    "ts": "4.3",
    "q": "A company runs an Amazon Redshift provisioned cluster for business intelligence reporting. Analysts query it on weekdays between 07:00 and 20:00 only, and the cluster is completely idle the rest of the time, including weekends. The data must stay in place and be queryable again each morning without an operator performing a restore step first. The cluster holds several terabytes of historical sales data that the reports scan directly, and finance has asked that the idle hours stop generating compute charges. Which solution will meet these requirements with the LEAST operational overhead?",
    "options": [
      "Resize the cluster to fewer nodes each evening and back to full size each morning.",
      "Delete the cluster with a final snapshot each evening and restore it from that snapshot each morning.",
      "Create scheduled actions that pause the cluster in the evening and resume it in the morning.",
      "Move the reporting queries to Amazon Redshift Spectrum so that the cluster can be deleted."
    ],
    "correct": 2,
    "explanation":
      "While an Amazon Redshift cluster is paused, on-demand billing is suspended and only the cluster's storage incurs charges, and the console can create a recurring schedule that generates the paired pause and resume scheduled actions, so no custom automation is needed and no restore step is involved. Resizing to fewer nodes still leaves nodes running and billed all night and all weekend. Deleting and restoring does stop compute charges, but every morning starts with a restore that the requirements exclude, and a deleted paused cluster without a final snapshot cannot be recovered at all. Redshift Spectrum queries data in Amazon S3 from a Redshift cluster or workgroup, so it does not remove the need for compute, and it would require reworking the reports and moving the data out of the cluster."
  },
  {
    "id": 446,
    "domain": 4,
    "ts": "4.3",
    "q": "An Amazon Aurora MySQL cluster serves a steady write workload plus a reporting read workload that is heavy for roughly two hours each morning and negligible for the rest of the day. The team has provisioned five reader instances of the same DB instance class as the writer and leaves all of them running around the clock. One reader must always remain available as a failover target for the writer. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Keep one reader of the same instance class as the writer and configure Aurora Auto Scaling to add and remove additional readers in response to the reporting load.",
      "Keep all five readers running, and enable the Aurora cluster cache management feature so that a failover finds an already warm buffer pool on the reader that gets promoted.",
      "Delete every reader instance in the cluster entirely, and send the reporting queries directly to the writer instance during the two-hour morning window each business day.",
      "Replace the writer instance with a larger Aurora DB instance class sized for the two-hour reporting peak, and delete all of the readers to remove their hourly cost from the monthly bill."
    ],
    "correct": 0,
    "explanation":
      "Aurora Auto Scaling adds and removes Aurora Replicas in response to load, so the cluster carries readers only during the two-hour reporting window; retaining a single reader of the same class as the writer preserves the failover target that AWS recommends for high availability. Keeping all five readers all day is the cost being questioned, and cluster cache management is a failover warm-cache feature that changes nothing about the bill. Deleting every reader removes the failover target, so a writer failure would leave the cluster unavailable while the instance is recreated, and it sends the reporting scans onto the write path. Enlarging the writer pays for peak capacity 24 hours a day and still leaves the cluster without a failover target."
  },
  {
    "id": 447,
    "domain": 4,
    "ts": "4.4",
    "q": "An application on Amazon EC2 instances in private subnets makes tens of terabytes of API calls each month to Amazon SQS and AWS Systems Manager. All of that traffic currently leaves through a NAT gateway, and the NAT gateway data processing charge now dominates the networking bill. The instances must keep their private addressing and must not be reachable from or able to reach the public internet. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Create gateway VPC endpoints for Amazon SQS and AWS Systems Manager and add the endpoint routes to the private subnet route tables.",
      "Move the instances into public subnets and assign an Elastic IP address to each one.",
      "Replace the NAT gateway with a NAT instance running on a large EC2 instance type.",
      "Create interface VPC endpoints for Amazon SQS and AWS Systems Manager in each Availability Zone that the application uses."
    ],
    "correct": 3,
    "explanation":
      "Interface VPC endpoints, powered by AWS PrivateLink, keep the API traffic on the AWS network and take it off the NAT gateway entirely; they are billed per endpoint hour in each Availability Zone plus per GB processed, which at tens of terabytes is materially cheaper than routing the same volume through a NAT gateway, and the instances keep private addressing with no internet path. Gateway endpoints exist only for Amazon S3 and Amazon DynamoDB, so they cannot be created for SQS or Systems Manager. Moving the instances to public subnets with Elastic IP addresses exposes them to the internet, which the requirements forbid. A NAT instance replaces a managed component with an EC2 instance the team must scale and patch, and it still carries all the traffic plus the instance and data transfer charges."
  },
  {
    "id": 448,
    "domain": 4,
    "ts": "4.4",
    "q": "A company reaches Amazon S3 and Amazon DynamoDB from a VPC through interface VPC endpoints deployed in three Availability Zones. All of the traffic originates from EC2 instances inside that VPC and targets the two services in the same Region; nothing on premises and no other VPC uses the endpoints. The bill shows an hourly charge for each endpoint in each Availability Zone plus a per-GB data processing charge on a large traffic volume. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Delete the interface endpoints, and route the traffic through a NAT gateway that is deployed in each of the three Availability Zones that the VPC currently spans.",
      "Replace the interface endpoints with gateway VPC endpoints for Amazon S3 and Amazon DynamoDB, and associate them with the private subnet route tables.",
      "Keep a single interface endpoint in one Availability Zone, and send all of the traffic from every one of the private subnets in the VPC to that endpoint.",
      "Enable S3 Transfer Acceleration, and have the instances use the accelerated endpoint."
    ],
    "correct": 1,
    "explanation":
      "Amazon S3 and DynamoDB are the two services that support gateway endpoints, and there is no additional charge for using a gateway endpoint: no hourly fee and no per-GB processing fee. Because all the traffic is in-Region and originates inside the VPC, the extra reach that interface endpoints provide to on-premises networks and peered VPCs is not needed here, so the company is paying for capability it does not use. Routing through NAT gateways reintroduces both an hourly charge and a data processing charge per GB. Collapsing to one interface endpoint keeps the per-GB processing charge and adds cross-Availability Zone data transfer charges for the two zones that no longer have a local endpoint. S3 Transfer Acceleration is a paid feature for long-distance uploads over the internet and would increase the bill for traffic that never leaves the Region."
  },
  {
    "id": 449,
    "domain": 4,
    "ts": "4.4",
    "q": "A manufacturer transfers about 40 TB of telemetry each month from a factory to AWS over an AWS Site-to-Site VPN that runs across a commodity internet circuit. Throughput varies with internet congestion, the nightly transfer window is missed several times a month, and the company expects this volume to continue for several years. It wants consistent throughput and a lower cost per gigabyte transferred. Which solution meets these requirements?",
    "options": [
      "Provision an AWS Direct Connect dedicated connection between the factory and the AWS Region, and carry the telemetry over a private virtual interface.",
      "Add a second Site-to-Site VPN tunnel, and spread the telemetry traffic across both of the tunnels by using equal-cost multipath routing at the gateway.",
      "Ship the telemetry to AWS each month on a set of AWS Snowball Edge devices instead.",
      "Keep the Site-to-Site VPN, and enable Amazon S3 Transfer Acceleration for the uploads, billed as an added per-gigabyte fee on top of standard transfer charges."
    ],
    "correct": 0,
    "explanation":
      "AWS Direct Connect establishes a dedicated connection between the on-premises network and AWS that can reduce network costs, increase bandwidth throughput, and provide a more consistent network experience than internet-based connections; at a sustained 40 TB per month over several years, the port hour charge plus the lower data transfer rate is the cheaper and more predictable profile. Additional VPN tunnels still ride the same congested internet circuit, so throughput remains at the mercy of the ISP. Snowball Edge suits one-time or offline bulk migrations, not a nightly telemetry feed, and monthly device handling adds recurring operational cost. Transfer Acceleration is billed on top of normal transfer charges and optimizes internet uploads to S3; it does not give the factory a predictable, lower-cost path."
  },
  {
    "id": 450,
    "domain": 4,
    "ts": "4.4",
    "q": "A company serves a read-heavy API and its web assets from Application Load Balancers in a single AWS Region to users spread across several continents. Most responses are identical for every user and change only a few times an hour. The largest line on the bill is data transfer out to the internet from that Region, and users far from the Region also report high latency. Which solution will meet these requirements MOST cost-effectively?",
    "options": [
      "Deploy the application and its Application Load Balancers into three additional Regions and route users with Amazon Route 53 latency-based routing.",
      "Enable sticky sessions on the Application Load Balancers and increase the load balancer idle timeout.",
      "Create an Amazon CloudFront distribution with the Application Load Balancer as the origin and cache the shared responses at the edge.",
      "Place AWS Global Accelerator in front of the Application Load Balancers."
    ],
    "correct": 2,
    "explanation":
      "CloudFront caches the shared responses in edge locations close to users, so repeat requests are answered at the edge and never reach the Application Load Balancer. That cuts both the volume of data transferred out of the Region and the latency for distant users, and CloudFront data transfer to the internet is billed at its own rates. AWS Global Accelerator improves latency and availability by carrying traffic over the AWS network from an edge location, but it does not cache anything, so every request still reaches the origin and the origin egress remains, plus Global Accelerator adds its own hourly and per-GB charges. Replicating the stack into three more Regions multiplies the infrastructure and operational cost to solve a caching problem. Sticky sessions and idle timeouts affect how connections are distributed and held open, not how much data leaves the Region."
  },
  {
    "id": 451,
    "domain": 4,
    "ts": "4.4",
    "q": "A VPC spans three Availability Zones and hosts an application tier in private subnets in each of them; the tier must remain deployed across all three Availability Zones. A single NAT gateway in one Availability Zone handles all outbound traffic, and every private subnet route table sends its default route to that NAT gateway. A cost review reports a large NAT gateway data processing charge and, separately, a large Availability Zone to Availability Zone data transfer charge. What should a solutions architect recommend?",
    "options": [
      "Replace the NAT gateway with a NAT instance in that same Availability Zone.",
      "Consolidate the whole application tier into the single Availability Zone that already hosts the shared NAT gateway, and terminate the instances in the other two zones.",
      "Attach an additional elastic network interface to the NAT gateway in each of the other two Availability Zones, and route the subnets to those interfaces.",
      "Deploy a NAT gateway in every Availability Zone and point each private subnet route table at the NAT gateway that sits in its own Availability Zone."
    ],
    "correct": 3,
    "explanation":
      "Traffic from the two Availability Zones without a NAT gateway crosses a zone boundary before it is processed, which is what produces the cross-Availability Zone data transfer charge on top of the NAT gateway processing charge. Deploying a NAT gateway per Availability Zone and routing each private subnet to the gateway in its own zone keeps that traffic local, removes the cross-zone charge, and also removes the single-zone dependency for outbound connectivity. A NAT instance keeps exactly the same traffic pattern and adds an EC2 instance to operate and scale. Consolidating the tier into one Availability Zone would end the cross-zone charge but breaks the requirement to stay across three Availability Zones. A NAT gateway is a zonal resource that cannot be extended into another Availability Zone by adding a network interface."
  }
];
