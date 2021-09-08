import React, { useState } from 'react';
import { Image, Wrap, Box, Center } from '@chakra-ui/react';
import { AiFillDelete } from 'react-icons/ai';
interface MemeContainerProrps {
  memes: any;
  onDelete: any;
}

export default function MemeContainer({
  memes,
  onDelete,
}: MemeContainerProrps) {
  return (
    <Wrap spacing={5} justifyContent={'flex-start'}>
      {memes
        .slice(0)
        .reverse()
        .map((meme: any) => (
          <MemeImage key={meme.id} meme={meme} onDelete={onDelete} />
        ))}
    </Wrap>
  );
}

interface MemeImageProrps {
  meme: any;
  onDelete: any;
}

const MemeImage = ({ meme, onDelete }: MemeImageProrps) => {
  const [showDelete, toggleShowDelete] = useState(false);

  return (
    <Box
      pos={'relative'}
      onMouseEnter={() => toggleShowDelete(true)}
      onMouseLeave={() => toggleShowDelete(false)}
      borderRadius="md"
      _hover={{ shadow: '2px 3px 10px rgba(0, 0, 0, 0.2)' }}
      overflow="hidden"
    >
      <Image
        objectFit={'cover'}
        src={
          meme.uploaded
            ? process.env.REACT_APP_MEME_API_URL + '/' + meme.url
            : meme.url
        }
        maxHeight="250px"
        id={meme.id}
      />
      <Center
        position={'absolute'}
        top={0}
        right={0}
        w={'40px'}
        h={'40px'}
        display={showDelete ? 'flex' : 'none'}
        bgColor={'white'}
        color={'red.700'}
        cursor="pointer"
        shadow="md"
        borderBottomLeftRadius="md"
        onClick={() => onDelete(meme.id)}
      >
        <AiFillDelete />
      </Center>
    </Box>
  );
};
