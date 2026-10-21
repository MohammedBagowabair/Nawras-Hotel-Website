import { useCallback, useState } from "react";
import { LangProvider } from "@/lib/lang";
import { ui } from "@/lib/content";
import { Header } from "./components/Header";
import { StoryHero } from "./components/StoryHero";
import { ShoreStrip } from "./components/ShoreStrip";
import { RoomDeck } from "./components/RoomDeck";
import { RoomSheet } from "./components/RoomSheet";
import { DayPlan } from "./components/DayPlan";
import { BookingChat } from "./components/Booking";
import { Lightbox } from "./components/Lightbox";
import { Faq, Footer, Gallery, House, Intro, Location, Postcards } from "./components/Sections";
import { ContactSheet, CreditsSheet, TabBar } from "./components/Dock";
import { T } from "./components/T";

function Page() {
  const [room, setRoom] = useState<number | null>(null);
  const [book, setBook] = useState({ open: false, room: -1 });
  const [photo, setPhoto] = useState<number | null>(null);
  const [contact, setContact] = useState(false);
  const [credits, setCredits] = useState(false);
  const openBook = useCallback((r = -1) => { setRoom(null); setBook({ open: true, room: r }); }, []);
  const closeBook = useCallback(() => setBook((b) => ({ ...b, open: false })), []);
  const closeRoom = useCallback(() => setRoom(null), []);
  const closePhoto = useCallback(() => setPhoto(null), []);
  const closeContact = useCallback(() => setContact(false), []);
  const closeCredits = useCallback(() => setCredits(false), []);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:z-[90] focus:rounded-full focus:bg-ocean focus:px-5 focus:py-3 focus:text-white ltr:focus:left-3 rtl:focus:right-3">
        <T v={ui.skip} />
      </a>
      <Header onBook={() => openBook()} />
      <main id="main">
        <StoryHero onBook={() => openBook()} />
        <ShoreStrip />
        <Intro />
        <RoomDeck onOpen={setRoom} />
        <DayPlan />
        <House />
        <Postcards />
        <Gallery onOpen={setPhoto} />
        <Location />
        <Faq />
      </main>
      <Footer onCredits={() => setCredits(true)} />
      <TabBar onBook={() => openBook()} onContact={() => setContact(true)} />
      <RoomSheet index={room} onClose={closeRoom} onBook={(r) => openBook(r)} />
      <BookingChat open={book.open} room={book.room} onClose={closeBook} />
      <ContactSheet open={contact} onClose={closeContact} />
      <CreditsSheet open={credits} onClose={closeCredits} />
      <Lightbox index={photo} onClose={closePhoto} />
    </>
  );
}

export function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}
