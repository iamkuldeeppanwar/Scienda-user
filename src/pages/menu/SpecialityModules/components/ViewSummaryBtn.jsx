
import { InformationIcon, ArrowRightIcon } from "./speciality-modules-icons";
import Stack from "react-bootstrap/Stack";

const ViewSummaryBtn = ({ onClick, text }) => {
    return (
        <Stack 
            direction="horizontal" 
            gap={3}
            style={{
                color: "var(--secondary-color)",
                fontWeight: 500,
                fontSize: "1rem",
                backgroundColor: "#EEF4FF",
                borderRadius: "6px",
                padding: "0.5rem 1.5rem",
                maxWidth: "max-content",
                cursor: "pointer"
            }}
            onClick={onClick}
        >
            <InformationIcon />
            <span>{text}</span>
            <ArrowRightIcon />
        </Stack>
    )
}

export default ViewSummaryBtn