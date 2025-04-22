import React, { useState } from 'react';
import SetInfoProM from './SetInfoProM';
import SetInfoCompteM from './SetInfoCompteM';
import SetInfoPersoM from './SetIonfoPersoM';

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

const SetInfoM = () => {
  return (
    <div className="container">
      <Tabs selected={0}>
      <Panel title="Information Compte">
          <SetInfoCompteM />
        </Panel>
        <Panel title="Information Personnelle">
          <SetInfoPersoM />
        </Panel>
        <Panel title="Information Professionnelle">
          <SetInfoProM />
        </Panel>
        
      </Tabs>
    </div>
  );
};

export default SetInfoM;
