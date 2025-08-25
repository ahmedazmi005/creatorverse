import React, { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import { ShowCreators, ViewCreator, EditCreator, AddCreator } from './pages'
import { supabase } from './client.js'
import './App.css'

function App() {
  // Initialize database connection and fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Test database connection
        const { data, error, count } = await supabase
          .from('creators')
          .select('*', { count: 'exact' });
        
        if (error) {
          console.error('Database connection error:', error);
        } else {
          console.log('Database connected successfully');
          console.log(`Found ${count} creators in database:`, data);
        }
      } catch (error) {
        console.error('Error connecting to database:', error);
      }
    };

    fetchInitialData();
  }, []);

  // Define the routes for the application
  const routes = useRoutes([
    {
      path: '/',
      element: <ShowCreators />
    },
    {
      path: '/creator/:id',
      element: <ViewCreator />
    },
    {
      path: '/edit-creator/:id',
      element: <EditCreator />
    },
    {
      path: '/add-creator',
      element: <AddCreator />
    }
  ]);

  return (
    <div className="app">
      {routes}
    </div>
  )
}

export default App
