import React, { useState } from 'react';
import SetInfocompte from './SetInfocompte';
import SetInfoMed from './SetInfoMed';
import SetInfoPersoP from './SetInfoPersoP';

const Tabs = ({ children, selected }) => {
  const [activeIndex, setActiveIndex] = useState(selected || 0);

  return (
    <div>
      <ul className="tab-menup">
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

const SetCompteP = () => {
  return (
    <div className="container">
      <Tabs selected={0}>
      <Panel title="Information Compte">
          <SetInfocompte />
        </Panel>
        <Panel title="Information Personnelle">
          <SetInfoPersoP />
        </Panel>
        <Panel title="Information Médicale">
          <SetInfoMed />
        </Panel>
        
      </Tabs>
    </div>
  );
};

export default SetCompteP;
