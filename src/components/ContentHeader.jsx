import React from 'react'
import DataFlow from 'util/DataFlow'

const headerTitles = {
    "wlc": "BHS",
    "net": "NET",
    "lxx": "LXX"
}

const defaultButtonStyle = {
    background: "#eaeaea",
    margin: "0 2px",
    cursor: "pointer",
    padding: "0 5px"
}
const styles = {
    headerCellStyle: {
        display: "table-cell",
        verticalAlign: "top",
        fontSize: "small",
        fontFamily:"sans-serif",
        background: "#f4f4f4",
        textAlign: "center",
        padding: 0
    },
    headerRowStyle: {
        display: "table",
        tableLayout: "fixed",
        width: "100%",
        direction: "ltr"
    },
    addButtonStyle: defaultButtonStyle,
    removeButtonStyle: defaultButtonStyle
} 

const toggleTextDisplay = ({text, on}) => {
    const texts = DataFlow.get("textsToDisplayMain")
    if (on)  {
        texts.push(text)
    }
    else {
        var index = texts.indexOf(text)
        if (index > -1) {
          texts.splice(index, 1);
        }
    }
    DataFlow.set("textsToDisplayMain", texts)
}

const AddButton = ({text}) => {
    const over = (e) => { e.target.style.backgroundColor="#deecf9" }
    const out = (e) => { e.target.style.backgroundColor="#eaeaea" }
    return <span
            onMouseOver={over}
            onMouseOut={out}
            style={styles.addButtonStyle}
            onClick={() => toggleTextDisplay({text, on: true})}
            >+ {headerTitles[text]}</span>
}
const RemoveButton = ({text}) => {
    const over = (e) => { e.target.style.backgroundColor="#ffa0a0" }
    const out = (e) => { e.target.style.backgroundColor="#eaeaea" }
    return <span
            onMouseOver={over}
            onMouseOut={out}
            style={styles.removeButtonStyle}
            onClick={() => toggleTextDisplay({text, on: false})}
            >–</span>
}

const ExtraButtons = ({openColumns}) => (
    <span>
    {Object.keys(headerTitles).filter(k => !openColumns.includes(k)).map(c => (
        <AddButton key={c} text={c} />
    ))}
    </span>
)

const ContentHeader = ({openColumns}) => (
    <div style={styles.headerRowStyle}>
        {openColumns.map((c, i) => (
        <div key={c} style={styles.headerCellStyle}>
            {headerTitles[c]}
            <div style={{display: "inline-block", float: "right"}}>
            {c !== "wlc" ? <RemoveButton text={c} /> : null}
            {i === openColumns.length - 1 ? (
                <ExtraButtons openColumns={openColumns} />
            ) : null}
            </div>
        </div>
        ))}
    </div>
)
export default ContentHeader