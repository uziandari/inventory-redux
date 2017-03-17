import React from 'react';
import Modal from 'react-modal';

const ReturnModal = (props) => {

  return (
    <Modal
      isOpen={ props.modalIsOpen }
      contentLabel="modal"
      onRequestClose={ () => props.onRequestClose() }>
      <div>
        <div>
          <button className="btn btn-danger" onClick={() => props.onRequestClose()}>X</button>
        </div>
        { (!props.items) ? <div></div> : props.items.map((item, index) => {
            const productImage = 'http://rockbottomimages.com/ProductImages/random/NoImage2.jpg';
            return (
              <div key={index} className="col-xs-12">
                <div className="card">
                  <div className="card-image">
                    <img src={(item.img_url === "") ? productImage : item.img_url} alt={item.description} />
                  </div>
                  <div className="card-info">
                    <div className="name">
                      <p>{item.sku}</p>
                    </div>
                    <hr />
                    <div className="content">
                      <p>{item.upc}</p>
                      <p>{item.description}</p>
                      <p></p>
                    </div>
                    <div>
                      <button className="btn btn-primary" onClick={() => props.selectedItem(index)}>Select</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </Modal>
  );
};

export default ReturnModal;
