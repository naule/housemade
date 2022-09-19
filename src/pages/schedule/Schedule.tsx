import * as React from "react";
import { FlexGrid, FlexGridItem } from "baseui/flex-grid";
import Default from "../../layouts/Default";
import { HeadingTitle } from "../../components/shared/HeadingTitle";
import { useStyletron } from "baseui";
import { Accordion, Panel } from "baseui/accordion";
import { RequestBooking } from "./components/RequestBooking";
import { Completed } from "./components/Completed";
import { Requesting } from "./components/Requesting";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import restricted from "../api/restricted";
import Head from "next/head";
import { UpcomingAsDefault } from "./components/UpcomingAsDefault";
import { UpcomingAsEnding } from "./components/UpcomingAsEnding";
import { UpcomingAsEndingReciever } from "./components/UpcomingAsEndingReciever";

// FOR RESTRICTED AUTH PURPOSE
export const getServerSideProps = restricted(async (ctx) => {
  return { props: {} };
});

// Wrapper
export const ScheduleWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [css] = useStyletron();

  return (
    <Accordion
      onChange={({ expanded }) => console.log(expanded)}
      accordion
      overrides={{
        Header: {
          style: ({ $theme }) => ({
            backgroundColor: $theme.colors.backgroundSecondary,
          }),
        },
        Content: {
          style: ({ $theme }) => ({
            paddingTop: "0px",
            paddingBottom: "0px",
            paddingLeft: "0px",
            paddingRight: "0px",
          }),
        },
      }}
    >
      {children}
    </Accordion>
  );
};

export default function Schedule() {
  const { data: session } = useSession();
  const { data, isLoading } = trpc.useQuery(
    ["schedule.appointments", { userId: session?.id as string }],
    { retry: false }
  );
  return (
    <Default hasHeader={true}>
      <Head>
        <title>Schedule | Housemade</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeadingTitle title="Schedule" />
      <FlexGrid
        flexGridColumnCount={[1, 1, 2, 3]}
        flexGridColumnGap="scale500"
        flexGridRowGap="scale500"
        justifyContent="center"
      >
        <FlexGridItem>
          <ScheduleWrapper>
            <Panel title="Requesting...">
              {data?.appointments.map((item) => {
                if (item.status === "request") {
                  if (item.clientId === session?.id) {
                    return <Requesting scheduleData={item} key={item.id} />;
                  }
                  return <RequestBooking scheduleData={item} key={item.id} />;
                }
              })}
            </Panel>
          </ScheduleWrapper>
        </FlexGridItem>
        <FlexGridItem>
          <ScheduleWrapper>
            <Panel title="Upcoming Appointment">
              {data?.appointments.map((item) => {
                if (item.status === "upcoming") {
                  if(item.upcoming_status === "default"){
                    return <UpcomingAsDefault scheduleData={item} key={item.id} />
                  }else if(item.upcoming_status === "ending" && session?.id != item.senderId){
                    return (<UpcomingAsEnding scheduleData={item} key={item.id} />);
                  }else if(item.upcoming_status === "ending" && item.senderId === session?.id){
                    return <UpcomingAsEndingReciever scheduleData={item} key={item.id} />;
                  }
                }
              })}
            </Panel>
          </ScheduleWrapper>
        </FlexGridItem>
        <FlexGridItem>
          <ScheduleWrapper>
            <Panel title="Completed Appointment">
              {data?.appointments.map((item) => {
                if (item.status === "completed") {
                  return <Completed scheduleData={item} key={item.id} />;
                }
              })}
            </Panel>
          </ScheduleWrapper>
        </FlexGridItem>
      </FlexGrid>
    </Default>
  );
}
