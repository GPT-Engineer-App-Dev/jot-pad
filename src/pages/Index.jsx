import { Container, Text, VStack, Heading, Button, Box, Input, Textarea, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jjfebbwwtcxyhvnkuyrh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqZmViYnd3dGN4eWh2bmt1eXJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY0NTgyMzMsImV4cCI6MjAzMjAzNDIzM30.46syqx3sHX-PQMribS6Vt0RLLUY7w295JHO61yZ-fec';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*');
    if (error) {
      console.error('Error fetching notes:', error);
    } else {
      setNotes(data);
    }
  };

  const addNote = async () => {
    if (title.trim() && content.trim()) {
      const { data, error } = await supabase
        .from('notes')
        .insert([{ title, content }]);
      if (error) {
        console.error('Error adding note:', error);
      } else {
        setNotes([...notes, ...data]);
        setTitle("");
        setContent("");
      }
    }
  };

  const deleteNote = async (id) => {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting note:', error);
    } else {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Note Taking App</Heading>
        <Box width="100%">
          <Input 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            mb={2}
          />
          <Textarea 
            placeholder="Content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            mb={2}
          />
          <Button colorScheme="teal" onClick={addNote} width="100%">Add Note</Button>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width="100%">
          {notes.map((note, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md">
              <Heading as="h3" size="md" mb={2}>{note.title}</Heading>
              <Text>{note.content}</Text>
              <Button colorScheme="red" onClick={() => deleteNote(note.id)} mt={2}>Delete</Button>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;