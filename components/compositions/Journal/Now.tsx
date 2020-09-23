import { RichText } from "components";
import { SecondaryText, Subtitle } from "designSystem";
import { ReactElement } from "react";
import { JournalEntry } from "services/contentful.types";

export default function Now({ entry }: { entry: JournalEntry }): ReactElement {
  return (
    <div>
      <Subtitle css={{ marginBottom: "$2" }}>What I&apos;m doing now</Subtitle>
      <RichText source={entry.content} unwrapped />
      <SecondaryText css={{ marginTop: "$2", display: "block" }}>
        Last updated &ndash; {entry.date}
      </SecondaryText>
    </div>
  );
}
