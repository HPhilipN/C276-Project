import React, { useState } from "react";
import Modal from "react-modal";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';

import "./Filter.css";

const customStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
    overflowY:"scroll",
    zIndex: 999,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 1400,
    maxHeight: 600,
    
  },
};

function Filter() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="Filter">
      <button className="filter-button" onClick={setModalOpen}>
        <div className="filter-icon">
            <FontAwesomeIcon icon={faFilter} />
            Filters
        </div>
      </button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
      > 
        
        <button onClick={() => setModalOpen(false)}>
            <FontAwesomeIcon icon={faX} />
        </button>
        <div>
            {/*Category*/}
            <div className="category-group">
                <p className="label">Categories</p>
            </div>
        </div>
      </Modal>
    </div>
  );
}

export default Filter;
