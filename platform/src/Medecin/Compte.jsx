import React, { useState } from 'react';
import InfoPro from './InfoPro';
import InfoCompteM from './InfoCompteM';
import InfoPersoM from './InfoPersoM';

const Tabs = ({ children, selected }) => {
  const [activeIndex, setActiveIndex] = useState(selected || 0);

  return (
    <div >
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

const Compte = () => {
  return (
    <div className="container">
      <Tabs selected={0}>
      <Panel title="Information Compte">
          <InfoCompteM />
        </Panel>
        <Panel title="Information Personnelle">
          <InfoPersoM />
        </Panel>
        <Panel title="Information Professionnelle">
          <InfoPro />
        </Panel>
              
      </Tabs>
    </div>
  );
};

export default Compte;
