import React from "react";
import Identicon from "react-identicons";
import web3 from "../web3";

export default function Main({
  setDescription,
  handleTip,
  handleSubmit,
  captureFile,
  posts,
}) {
  return (
    <div className="container-fluid mt-5">
      <div className="row ">
        <div className="col-md-4 mx-auto ">
          <h3>Compartir imagen</h3>
          <form onSubmit={handleSubmit} className="bg-light p-3 mb-3">
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .bmp, .gif"
              onChange={captureFile}
            />
            <div className="form-group mt-2">
              <input
                name="description"
                type="text"
                placeholder="Introduce una breve descripcion de la imagen..."
                className="form-control"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <button type="submit" className="mt-2 btn btn-primary">
                Publicar!!
              </button>
            </div>
          </form>

          <div className="mt-2">
            {posts.map((post, index) => {
              return (
                <div className="card mb-4" key={index}>
                  <div className="card-header">
                    <Identicon size="30" string={post.author} />
                    <small className="text-muted">{post.author}</small>
                  </div>

                  <img
                    className="mr-2"
                    src={`https://ipfs.infura.io/ipfs/${post.imgHash}`}
                  />

                  <div className="card-body">{post.description}</div>
                  <div className="card-footer d-flex justify-content-between">
                    <div>Propinas: {web3.utils.fromWei(post.tipAmount.toString(), 'Ether')}</div>
                    <div>
                      <a className="text-primary" style={{cursor:'pointer'}} onClick={(e) => handleTip(post.id) }>Dar Propina 0.1 Eth</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
