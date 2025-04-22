import React, { useState } from 'react';
import Infoperso from './Infoperso';
import Infomed from './Infomed';
import InfoCompteP from './InfoCompteP';

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

const Hist = () => {
  return (
    <div className="container">
      <Tabs selected={0}>
      <Panel title="Information Compte">
          <InfoCompteP />
        </Panel>
        <Panel title="Information Personnelle">
          <Infoperso/>
        </Panel>
        <Panel title="Information Médeciale">
          <Infomed />
        </Panel>
        
      </Tabs>
    </div>
  );
};

export default Hist;
