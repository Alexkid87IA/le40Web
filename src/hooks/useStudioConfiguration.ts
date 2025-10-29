import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface StudioConfiguration {
  id?: string;
  studioId: string;
  formulaId: string;
  durationHours: number;
  selectedOptions: Record<string, number>;
  totalPrice: number;
  configurationName?: string;
  isFavorite?: boolean;
  shareToken?: string;
  createdAt?: string;
  updatedAt?: string;
}

export function useStudioConfiguration() {
  const [configurations, setConfigurations] = useState<StudioConfiguration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveConfiguration = async (config: StudioConfiguration): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data: session } = await supabase.auth.getSession();

      const configData = {
        user_id: session.session?.user?.id || null,
        studio_id: config.studioId,
        formula_id: config.formulaId,
        duration_hours: config.durationHours,
        selected_options: config.selectedOptions,
        total_price: config.totalPrice,
        configuration_name: config.configurationName || null,
        is_favorite: config.isFavorite || false
      };

      const { data, error: insertError } = await supabase
        .from('studio_configurations')
        .insert(configData)
        .select()
        .maybeSingle();

      if (insertError) throw insertError;

      if (data) {
        await loadUserConfigurations();
        return data.share_token;
      }

      return null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save configuration');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const loadUserConfigurations = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: session } = await supabase.auth.getSession();

      if (!session.session?.user?.id) {
        setConfigurations([]);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('studio_configurations')
        .select('*')
        .eq('user_id', session.session.user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const formattedConfigs: StudioConfiguration[] = (data || []).map(row => ({
        id: row.id,
        studioId: row.studio_id,
        formulaId: row.formula_id,
        durationHours: row.duration_hours,
        selectedOptions: row.selected_options,
        totalPrice: parseFloat(row.total_price),
        configurationName: row.configuration_name,
        isFavorite: row.is_favorite,
        shareToken: row.share_token,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      }));

      setConfigurations(formattedConfigs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load configurations');
    } finally {
      setLoading(false);
    }
  };

  const loadSharedConfiguration = async (shareToken: string): Promise<StudioConfiguration | null> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('studio_configurations')
        .select('*')
        .eq('share_token', shareToken)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!data) return null;

      return {
        id: data.id,
        studioId: data.studio_id,
        formulaId: data.formula_id,
        durationHours: data.duration_hours,
        selectedOptions: data.selected_options,
        totalPrice: parseFloat(data.total_price),
        configurationName: data.configuration_name,
        shareToken: data.share_token,
        createdAt: data.created_at
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load shared configuration');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateConfiguration = async (id: string, updates: Partial<StudioConfiguration>) => {
    setLoading(true);
    setError(null);

    try {
      const updateData: any = {};
      if (updates.configurationName !== undefined) updateData.configuration_name = updates.configurationName;
      if (updates.isFavorite !== undefined) updateData.is_favorite = updates.isFavorite;
      if (updates.selectedOptions !== undefined) updateData.selected_options = updates.selectedOptions;
      if (updates.totalPrice !== undefined) updateData.total_price = updates.totalPrice;

      const { error: updateError } = await supabase
        .from('studio_configurations')
        .update(updateData)
        .eq('id', id);

      if (updateError) throw updateError;

      await loadUserConfigurations();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update configuration');
    } finally {
      setLoading(false);
    }
  };

  const deleteConfiguration = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from('studio_configurations')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      await loadUserConfigurations();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete configuration');
    } finally {
      setLoading(false);
    }
  };

  const trackInteraction = async (interaction: {
    sessionId: string;
    configurationId?: string;
    actionType: string;
    studioId?: string;
    optionsViewed?: string[];
    timeSpentSeconds?: number;
  }) => {
    try {
      await supabase.from('configuration_interactions').insert({
        session_id: interaction.sessionId,
        configuration_id: interaction.configurationId || null,
        action_type: interaction.actionType,
        studio_id: interaction.studioId || null,
        options_viewed: interaction.optionsViewed || [],
        time_spent_seconds: interaction.timeSpentSeconds || 0
      });
    } catch (err) {
      console.error('Failed to track interaction:', err);
    }
  };

  useEffect(() => {
    loadUserConfigurations();
  }, []);

  return {
    configurations,
    loading,
    error,
    saveConfiguration,
    loadUserConfigurations,
    loadSharedConfiguration,
    updateConfiguration,
    deleteConfiguration,
    trackInteraction
  };
}

export function useStudioReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadReviews = async (studioId?: string, optionId?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('studio_reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (studioId) query = query.eq('studio_id', studioId);
      if (optionId) query = query.eq('option_id', optionId);

      const { data } = await query;
      setReviews(data || []);
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (review: {
    studioId?: string;
    optionId?: string;
    rating: number;
    comment?: string;
  }) => {
    try {
      const { data: session } = await supabase.auth.getSession();

      await supabase.from('studio_reviews').insert({
        user_id: session.session?.user?.id || null,
        studio_id: review.studioId || null,
        option_id: review.optionId || null,
        rating: review.rating,
        comment: review.comment || null
      });

      await loadReviews(review.studioId, review.optionId);
    } catch (err) {
      console.error('Failed to submit review:', err);
    }
  };

  return {
    reviews,
    loading,
    loadReviews,
    submitReview
  };
}

export function generateSessionId(): string {
  const stored = sessionStorage.getItem('studio_session_id');
  if (stored) return stored;

  const newId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem('studio_session_id', newId);
  return newId;
}
