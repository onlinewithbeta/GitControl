    const token = 'Api_key'; // Replace with your access token
    const repoOwner = 'onlinewithbeta'; // Replace with your GitHub username or organization
    const repoName = 'TestDatabase';
    
    
    
    
    
// Read JSON from GitHub
async function fetchJsonData(file) {
  const url = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${file}`;
  
  try {
    console.log('Fetching JSON data...');
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return console.log(data);

  } catch (error) {
    console.error('Error fetching JSON data:', error);
    throw error; // Re-throw the error if you want to handle it elsewhere
  }
}

// Usage example
document.getElementById('read').addEventListener('click', async () => {
  fetchJsonData('John.json');
});


    
    //Create new json  
    async function createAndUploadJson() {
      const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/delete.json`;
      // Replace with your repository URL
      
      // Step 1: Create JSON object
      const jsonObject = {
        name: "John Doe",
        age: 31,
        city: "New York"
      };
      
      // Convert JSON object to string
      const jsonString = JSON.stringify(jsonObject, null, 2); // Pretty print with 2 spaces
      
      // Step 2: Prepare the data for GitHub API
      const data = {
        message: "Add new JSON file",
        content: btoa(jsonString), // Encode as Base64
        branch: "main" // Specify the branch if necessary
      };
      
      // Step 3: POST request to GitHub API
      try {
        const response = await fetch(url, {
          method: "PUT", // Use PUT to create/update a file
          headers: {
            "Authorization": `token ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        
        
        
        // Parse the response if needed
        const result = await response.json();
        console.log("File uploaded successfully:", result);
        
      } catch (error) {
        console.error("Error uploading JSON file:", error);
      }
      fetchJsonData('delete.json')
    }
    // Call the function
    document.getElementById('create').addEventListener('click', () => {
      createAndUploadJson();
    });
    
    
    //Update json
    async function updateFile() {
      const filePath = 'file.json';
      const githubToken = token;
      
      const newFileContent = JSON.stringify([{ name: "Believe Hacked", age: 38, city: "Nigeria" }]);
      
      const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
      
      try {
        // Get the current file contents and SHA
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${githubToken}`,
          },
        });
        const data = await response.json();
        const sha = data.sha;
        
        // Update the file contents
        const updateResponse = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${githubToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'Updated file contents',
            content: btoa(newFileContent),
            branch: 'main',
            sha: sha,
          }),
        });
        const updateData = await updateResponse.json();
        console.log(updateData);
      } catch (error) {
        console.error(error);
      }
    }
    // Cal the function to edit the JSON file
    document.getElementById('update').addEventListener('click', () => {
      updateFile();
    });
    
    
    
    //delete Json
    function deleteMySt() {
      const filePath = 'delete.json';
      const githubToken = token;
      
      const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
      
      async function deleteFile() {
        try {
          // Get the current file SHA
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${githubToken}`,
            },
          });
          const data = await response.json();
          const sha = data.sha;
          
          // Delete the file
          const deleteResponse = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${githubToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: 'Delete file',
              sha: sha,
            }),
          });
          const deleteData = await deleteResponse.json();
          console.log(deleteData);
        } catch (error) {
          console.error(error);
        }
      }
      
      deleteFile();
      
    }
    
    
    
    document.getElementById('Delete').addEventListener('click', () => {
      deleteMySt();
      
    });
    
    
    
    
    
    
    
    async function getRepositoryNames() {
      try {
        // Set your GitHub username and personal access token
        const username = repoOwner;
        
        // Set the API endpoint URL
        const url = `https://api.github.com/users/${username}/repos`;
        
        // Make the API request using fetch()
        const response = await fetch(url);
        
        // Check if the response was successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Parse the response data as JSON
        const data = await response.json();
        
        // Extract the repository names from the response data
        const repoNames = data.map(repo => repo.name);
        
        // Log the repository names to the console
        console.log(repoNames);
      } catch (error) {
        console.error(error);
      }
    }
    
    // Call the async function
    
    getRepositoryNames();
    
  