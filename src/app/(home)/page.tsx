import Image from "next/image";
import styles from "./page.module.scss";
import PublicLayout from "~/layouts/PublicLayout/PublicLayout";

export default function Home() {
    return (
        <PublicLayout>
            <h1>Home</h1>
        </PublicLayout>
    );
}
