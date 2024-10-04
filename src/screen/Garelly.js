import React, { useEffect, useState } from "react";
import data from "./rawdata";

export default function Garelly() {
  const [album, setAlbum] = useState([]);
  const [image, setimage] = useState("");
  const [folder, setfolder] = useState(0);
  const [forchange, setforchange] = useState({
    albumid: 0,
    id: 0,
  });
  useEffect(() => {
    const uniqid = data.reduce((acc, cur) => {
      if (!acc.includes(cur.albumId)) {
        acc.push(cur.albumId);
      }
      return acc;
    }, []);
    setAlbum(uniqid);
  }, []);
  const handleclick = (url, albumId, id) => {
    setimage(url);
    setforchange({
      albumid: albumId,
      id: id,
    });
  };
  const handlecrossclick = () => {
    setimage("");
  };
  const handleleft = () => {
    data.map((elem) => {
      if (elem.albumId === forchange.albumid && elem.id === forchange.id - 1) {
        setimage(elem.url);
        setforchange({
          albumid: forchange.albumid,
          id: forchange.id - 1,
        });
      }
      return image;
    });
  };
  const handleright = () => {
    data.map((elem) => {
      if (elem.albumId === forchange.albumid && elem.id === forchange.id + 1) {
        setimage(elem.url);
        setforchange({
          albumid: forchange.albumid,
          id: forchange.id + 1,
        });
      }
      return image;
    });
  };
  const handlefolderclick = (elem) => {
    if (elem === folder) {
      setfolder(0);
    }
    if (elem !== folder) {
      setfolder(elem);
    }
  };

  return (
    <div className="container">
      <div className="folder">
        {album.map((elem) => (
          <div key={elem}>
            <button onClick={() => handlefolderclick(elem)}>
              Album {elem}
            </button>
            {data
              .filter((photo) => elem === photo.albumId)
              .map((photo) => (
                <div key={photo.id} className="folder-files">
                  <img
                    style={{
                      display: folder === photo.albumId ? "block" : "none",
                    }}
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    loading="lazy"
                    onClick={() =>
                      handleclick(photo.url, photo.albumId, photo.id)
                    }
                  />
                </div>
              ))}
          </div>
        ))}
      </div>
      <div className="fullimage">
        <button
          className="left-btn"
          style={{ display: image === "" ? "none" : "block" }}
          onClick={handleleft}
        >
          left
        </button>
        <img src={image} alt="" loading="lazy" />
        <button
          className="cross-btn"
          style={{ display: image === "" ? "none" : "block" }}
          onClick={handlecrossclick}
        >
          X
        </button>
        <button
          className="right-btn"
          style={{ display: image === "" ? "none" : "block" }}
          onClick={handleright}
        >
          right
        </button>
      </div>
    </div>
  );
}
