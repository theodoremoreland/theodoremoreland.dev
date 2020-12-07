// React
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

// Other
import ReactMarkdown from 'react-markdown/with-html';

// Bootstrap
// import Alert from 'react-bootstrap/Alert'

// Custom Styles
import './README.css';

export default function README({name, link, readmeIsActive, setReadmeIsActive}) {
    const [readmeString, setReadmeString] = useState(undefined);
    const imgURLRegex = new RegExp("presentation/", "g");
    const imgWidthRegex = new RegExp(`width="*"*>`, "g");

    const fetchReadme = () => {
        fetch(link)
            .then(res => res.text())
            .then(text => {
                text = text === "404: Not Found"
                    ? "This project does not currently feature a README.md file."
                    : text
                text = text
                        .replace(imgURLRegex, `https://raw.githubusercontent.com/theodoremoreland/${name}/master/presentation/`)
                        .replace(imgWidthRegex, `width="100">`);
                setReadmeString(text);
            })
            .catch(err => console.log(err));
    }

    useEffect(fetchReadme, []);

    return (
        <>
        {
            readmeIsActive
                ?   <Alert
                        className="readme"
                        onClose={() => setReadmeIsActive(false)}
                        dismissible
                    >
                        <ReactMarkdown allowDangerousHtml children={readmeString}/>
                    </Alert>
                : ""
        }
        </>
    );
}
