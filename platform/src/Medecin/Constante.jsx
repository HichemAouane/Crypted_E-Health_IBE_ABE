import React, { useState } from 'react';
import Bracelet from './Bracelet';
import NBracelet from './NBracelet';
import "./Constante.css"

const Tabs = ({ children, selected }) => {
  const [activeIndex, setActiveIndex] = useState(selected || 0);

  return (
    <div>
      <ul className="tab-menu">
        {children.map((child, index) => (
          <li
            key={index}
            className={activeIndex === index ? 'selected' : ''}
            onClick={() => setActiveIndex(index)}
          >
            {child.props.title}
          </li>
        ))}
      </ul>
      <div className="tab-content">{children[activeIndex]}</div>
    </div>
  );
};

const Panel = ({ children }) => <div>{children}</div>;

const Constante = ({ patientId }) => {
  return (
    <div className="container">
      <Tabs selected={0}>
        <Panel title="Avec Bracelet">
          <Bracelet />
        </Panel>
        <Panel title="Sans Bracelet">
          <NBracelet />
        </Panel>
      </Tabs>
    </div>
  );
};

export default Constante;
