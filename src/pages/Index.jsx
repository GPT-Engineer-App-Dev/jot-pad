import { Container, Text, VStack, Heading, Button, Box, Input, Textarea, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addNote = () => {
    if (title.trim() && content.trim()) {
      setNotes([...notes, { title, content }]);
      setTitle("");
      setContent("");
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
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;