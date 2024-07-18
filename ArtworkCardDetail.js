import { useAtom } from 'jotai';
import { useState } from 'react';
import { favouritesAtom } from '../store';
import Button from 'react-bootstrap/Button';

const ArtworkCardDetail = ({ artwork }) => {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  const favouritesClicked = () => {
    if (favouritesList.includes(artwork.objectID)) {
      setFavouritesList(favouritesList.filter(id => id !== artwork.objectID));
    } else {
      setFavouritesList([...favouritesList, artwork.objectID]);
    }
    setShowAdded(!showAdded);
  };

  return (
    <div>
      {/* Existing artwork details */}
      <Button onClick={favouritesClicked}>
        {showAdded ? 'Remove from Favourites' : 'Add to Favourites'}
      </Button>
    </div>
  );
};

export default ArtworkCardDetail;
