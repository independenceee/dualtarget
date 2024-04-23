import { Lucid } from "lucid-cardano";

export type LucidContextType = {
    lucid: Lucid;
    lucidPlatform: Lucid;
    setLucid: React.Dispatch<React.SetStateAction<Lucid>>;
};
