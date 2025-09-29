import { Metadata } from "next";
import chooseIcon1 from "@/../public/assets/image/choose1.webp";
import chooseIcon2 from "@/../public/assets/image/choose2.webp";
import ChooseRoleClient from "@/components/ui/choose-role/ChooseRoleClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Choose Role",
  description:
    "Tryouts, Camps, Tournaments. All in One Place. All Across America.",
};

const roles = [
  {
    title: "Find Events",
    description:
      "For families and players who want to search, filter, and register for youth Sport events. Only $19.99/year (Service launch discount $10/year).",
    icon: chooseIcon1,
    state: "find-events",
    buttonText: "Sign Up to Find Events",
  },
  {
    title: "List Events",
    description:
      "For coaches, clubs, and organizers who want to create and publish events — completely FREE to register and list events.",
    icon: chooseIcon2,
    state: "list-events",
    buttonText: "Sign Up to List Events",
  },
];

export default function ChooseRolePage() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <ChooseRoleClient roles={roles} />
    </Suspense>
  )
}