// Database utility functions for CreatorVerse
// This file contains all database operations using Supabase

import { supabase } from '../client.js';

/**
 * Fetch all creators from the database
 * @returns {Promise<Array>} Array of creator objects
 */
export const getAllCreators = async () => {
  try {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching creators:', error);
    throw error;
  }
};

/**
 * Fetch a single creator by ID
 * @param {string|number} id - Creator ID
 * @returns {Promise<Object|null>} Creator object or null if not found
 */
export const getCreatorById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('creators')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching creator:', error);
    throw error;
  }
};

/**
 * Create a new creator
 * @param {Object} creatorData - Creator data to insert
 * @returns {Promise<Object>} Created creator object
 */
export const createCreator = async (creatorData) => {
  try {
    const { data, error } = await supabase
      .from('creators')
      .insert([creatorData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating creator:', error);
    throw error;
  }
};

/**
 * Update an existing creator
 * @param {string|number} id - Creator ID
 * @param {Object} updatedData - Updated creator data
 * @returns {Promise<Object>} Updated creator object
 */
export const updateCreator = async (id, updatedData) => {
  try {
    const { data, error } = await supabase
      .from('creators')
      .update(updatedData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating creator:', error);
    throw error;
  }
};

/**
 * Delete a creator
 * @param {string|number} id - Creator ID to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteCreator = async (id) => {
  try {
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting creator:', error);
    throw error;
  }
};
