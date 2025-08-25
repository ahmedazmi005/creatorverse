import { createClient } from '@supabase/supabase-js';

const URL = 'https://nhhgabpecngzccvqrjiu.supabase.co'

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oaGdhYnBlY25nemNjdnFyaml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwODI3NDcsImV4cCI6MjA3MTY1ODc0N30.I-R-5z340spkHXkZ6SqASJ_GYMX2CDjqsjylL9YIW0o'

export const supabase = createClient(URL, API_KEY)

