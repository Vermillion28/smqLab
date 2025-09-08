import React from "react";
import Link from "next/link";
export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Link href="/connexion">Connexion</Link><br />
            <Link href="/inscription">Inscription</Link>
        </div>
    );
}