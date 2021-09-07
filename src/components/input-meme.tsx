import React, { useEffect } from 'react';
import {
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
  FormLabel,
  Alert,
  AlertIcon,
  AlertTitle,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import checkImage from '../utils/check-valid-image-link';

export default function InputMeme({ setMemes }) {
  const [url, setUrl] = useState('');
  const [notUrl, setNotUrl] = useState(false);

  const addMemeByUrl = async (url: string) => {
    if (await checkImage(url)) {
      const { data } = await axios.post(process.env.REACT_APP_MEME_API_URL, {
        url: url,
        uploaded: false,
      });
      setUrl('');
      setMemes((memes: any) => [...memes, data.data.meme]);
    } else {
      setNotUrl(true);
      setTimeout(() => setNotUrl(false), 1500);
    }
  };

  const uploadMeme = async (event: any) => {
    const form = new FormData();
    form.append('meme', event.target.files[0]);
    form.append('uploaded', true);
    const { data } = await axios.post(
      process.env.REACT_APP_MEME_API_URL,
      form,
      {}
    );
    setMemes((memes: any) => [...memes, data.data.meme]);
  };

  useEffect(() => {
    axios(process.env.REACT_APP_MEME_API_URL).then(({ data }) => {
      setMemes(data.data);
    });
  }, [setMemes]);

  return (
    <Stack
      direction={['column', 'row']}
      spacing={4}
      flexWrap={'wrap'}
      width={'100%'}
    >
      <FormControl flex={4}>
        <InputGroup>
          <Input
            type="text"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Link..."
          />
          <InputRightAddon
            minWidth={'fit-content'}
            cursor={'pointer'}
            children={'Add Meme'}
            onClick={() => addMemeByUrl(url)}
          />
        </InputGroup>
      </FormControl>
      <FormControl flex={1}>
        <Input
          type="file"
          accept="image/*"
          hidden={true}
          name="meme"
          onChange={uploadMeme}
        />
        <FormLabel m={0}>
          <Button as={'span'} width={'100%'} cursor={'pointer'}>
            Upload
          </Button>
        </FormLabel>
      </FormControl>

      {notUrl && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Invalid image url</AlertTitle>
        </Alert>
      )}
    </Stack>
  );
}
