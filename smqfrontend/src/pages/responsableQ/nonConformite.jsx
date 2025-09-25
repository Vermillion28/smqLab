import LayoutRQ from "@/Layout/layoutResponsableQ";
import {AlertTriangle} from "lucide-react";
import styles from "@/styles/responsableQ.module.css";
import {Button} from "@/components/ui/button";

export default function NonConformite() {
    return (
        <LayoutRQ>
            <div className={styles.nonConformiteBody}>
                <div className={styles.nonConformiteHeader}>
                    <h1 className={styles.nonConformiteTitle}><AlertTriangle size={30} className={styles.nonConformiteIcon} />Non-Conformité</h1>
                    <Button variant="default">Ajouter une non-conformité</Button>
                </div>
            </div>
        </LayoutRQ>
    );
}
