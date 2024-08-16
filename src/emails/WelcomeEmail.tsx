import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Heading,
  Text,
  Hr,
  Link,
} from "@react-email/components";

const WelcomeEmail = ({
  userName = "User",
  userEmail = "example@gmail.com",
  subscriptionStartDate = new Date(),
  subscriptionEndDate = new Date(),
}: {
  userName: string;
  userEmail: string;
  subscriptionStartDate: Date;
  subscriptionEndDate: Date;
}) => {
  // TODO => ADD THE PROD URL
  const BASE_URL =
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

  return (
    <Html>
      <Head />
      <Preview>Welcome to OnlyHorses!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={message}>
            <Img
              src={`${BASE_URL}/horse-1.png`}
              // todo => delete this one below
              //src={`https://i.ibb.co/CV1mKKY/horse-1.jpg`}
              width="600"
              height="400"
              alt="welcome icon"
              style={{ margin: "auto", borderRadius: 10 }}
            />
            <Heading style={{ ...global.heading }}>
              Welcome to OnlyHorses!
            </Heading>
            <Text style={global.text}>Hello {userName},</Text>
            <Text style={global.text}>
              We're really happy to see you on our platform. We hope you have a
              great experience and enjoy all the features we offer.
            </Text>
            <Hr style={global.hr} />

            <Text style={{ ...global.text, marginTop: 24 }}>User Details:</Text>
            <Text style={{ ...global.text }}>
              Email: {userEmail}
              <br />
              Name: {userName}
            </Text>
            <Hr style={global.hr} />

            <Text style={{ ...global.text, marginTop: 24 }}>
              Subscription Details:
            </Text>
            <Text style={{ ...global.text }}>
              Your subscription starts on:{" "}
              {subscriptionStartDate.toDateString()}
              <br />
              Your subscription ends on: {subscriptionEndDate.toDateString()}
            </Text>
            <Hr style={global.hr} />

            <Text style={{ ...global.text, marginTop: 24 }}>
              Thanks for subscribing! We will see you in the platform. 🙂❤
            </Text>
            <Link
              href={BASE_URL}
              style={{ ...global.button, margin: "10px auto" }}
            >
              Visit OnlyHorses
            </Link>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Text style={footer.text}>
              © {new Date().getFullYear()} OnlyHorses, Inc. All Rights Reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
    textAlign: "center" as "center",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  } as React.CSSProperties,
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
} as React.CSSProperties;

const footer = {
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  } as React.CSSProperties,
};

// STARTER CODE:
// import {
//   Body,
//   Button,
//   Column,
//   Container,
//   Head,
//   Heading,
//   Html,
//   Img,
//   Link,
//   Preview,
//   Row,
//   Section,
//   Text,
//   Tailwind,
// } from "@react-email/components";
// import * as React from "react";

// interface NetlifyWelcomeEmailProps {
//   steps?: {
//     id: number;
//     Description: React.ReactNode;
//   }[];
//   links?: string[];
// }

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "";

// const PropDefaults: NetlifyWelcomeEmailProps = {
//   steps: [
//     {
//       id: 1,
//       Description: (
//         <li className="mb-20" key={1}>
//           <strong>Deploy your first project.</strong>{" "}
//           <Link>Connect to Git, choose a template</Link>, or manually deploy a
//           project you've been working on locally.
//         </li>
//       ),
//     },
//     {
//       id: 2,
//       Description: (
//         <li className="mb-20" key={2}>
//           <strong>Check your deploy logs.</strong> Find out what's included in
//           your build and watch for errors or failed deploys.{" "}
//           <Link>Learn how to read your deploy logs</Link>.
//         </li>
//       ),
//     },
//     {
//       id: 3,
//       Description: (
//         <li className="mb-20" key={3}>
//           <strong>Choose an integration.</strong> Quickly discover, connect, and
//           configure the right tools for your project with 150+ integrations to
//           choose from. <Link>Explore the Integrations Hub</Link>.
//         </li>
//       ),
//     },
//     {
//       id: 4,
//       Description: (
//         <li className="mb-20" key={4}>
//           <strong>Set up a custom domain.</strong> You can register a new domain
//           and buy it through Netlify or assign a domain you already own to your
//           site. <Link>Add a custom domain</Link>.
//         </li>
//       ),
//     },
//   ],
//   links: ["Visit the forums", "Read the docs", "Contact an expert"],
// };

// export const NetlifyWelcomeEmail = ({
//   steps = PropDefaults.steps,
//   links = PropDefaults.links,
// }: NetlifyWelcomeEmailProps) => {
//   return (
//     <Html>
//       <Head />
//       <Preview>Netlify Welcome</Preview>
//       <Tailwind
//         config={{
//           theme: {
//             extend: {
//               colors: {
//                 brand: "#2250f4",
//                 offwhite: "#fafbfb",
//               },
//               spacing: {
//                 0: "0px",
//                 20: "20px",
//                 45: "45px",
//               },
//             },
//           },
//         }}
//       >
//         <Body className="bg-offwhite text-base font-sans">
//           <Img
//             src={`${baseUrl}/static/netlify-logo.png`}
//             width="184"
//             height="75"
//             alt="Netlify"
//             className="mx-auto my-20"
//           />
//           <Container className="bg-white p-45">
//             <Heading className="text-center my-0 leading-8">
//               Welcome to Netlify
//             </Heading>

//             <Section>
//               <Row>
//                 <Text className="text-base">
//                   Congratulations! You're joining over 3 million developers
//                   around the world who use Netlify to build and ship sites,
//                   stores, and apps.
//                 </Text>

//                 <Text className="text-base">Here's how to get started:</Text>
//               </Row>
//             </Section>

//             <ul>{steps?.map(({ Description }) => Description)}</ul>

//             <Section className="text-center">
//               <Button className="bg-brand text-white rounded-lg py-3 px-[18px]">
//                 Go to your dashboard
//               </Button>
//             </Section>

//             <Section className="mt-45">
//               <Row>
//                 {links?.map((link) => (
//                   <Column key={link}>
//                     <Link className="text-black underline font-bold">
//                       {link}
//                     </Link>{" "}
//                     <span className="text-green-500">→</span>
//                   </Column>
//                 ))}
//               </Row>
//             </Section>
//           </Container>

//           <Container className="mt-20">
//             <Section>
//               <Row>
//                 <Column className="text-right px-20">
//                   <Link>Unsubscribe</Link>
//                 </Column>
//                 <Column className="text-left">
//                   <Link>Manage Preferences</Link>
//                 </Column>
//               </Row>
//             </Section>
//             <Text className="text-center text-gray-400 mb-45">
//               Netlify, 44 Montgomery Street, Suite 300 San Francisco, CA
//             </Text>
//           </Container>
//         </Body>
//       </Tailwind>
//     </Html>
//   );
// };

// export default NetlifyWelcomeEmail;
