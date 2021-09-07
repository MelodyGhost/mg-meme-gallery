import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Flex,
  theme as ChakraTheme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/ColorModeSwitcher';
import InputMeme from './components/input-meme';
import MemeContainer from './components/meme-container';
import axios from 'axios';

export const App = () => {
  const [memes, setMemes] = useState<any[]>([]);

  const onDelete = async (id: string) => {
    await axios.delete(`${process.env.REACT_APP_MEME_API_URL}/${id}`);
    setMemes(memes.filter((meme) => meme.id !== id));
  };

  return (
    <ChakraProvider theme={ChakraTheme}>
      <Box
        textAlign="center"
        maxWidth={'container.md'}
        fontSize="xl"
        m={'auto'}
      >
        <Flex minH="100vh" p={3} flexDir={'column'}>
          <ColorModeSwitcher justifyContent="center" m="auto 0 auto auto" />
          <VStack spacing={8} alignItems={'center'}>
            <Text as={'h1'} fontWeight={'bold'} fontSize={'lg'}>
              Meme Gallery
            </Text>
            <Link as={'button'} variant={'outline'}>
              See Stats
            </Link>
            <InputMeme setMemes={setMemes} />
            <MemeContainer memes={memes} onDelete={onDelete} />
          </VStack>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};
