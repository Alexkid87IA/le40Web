import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, Phone, Clock, User, MessageSquare, CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface VisitRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  message: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

const statusConfig = {
  pending: { label: 'En attente', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  confirmed: { label: 'Confirmée', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  completed: { label: 'Terminée', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-800 border-red-200' }
};

export default function AdminVisits() {
  const [visits, setVisits] = useState<VisitRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const fetchVisits = async () => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase
        .from('visit_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setVisits(data || []);
    } catch (err) {
      console.error('Error fetching visits:', err);
      setError('Erreur lors du chargement des demandes de visite');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, [filter]);

  const updateStatus = async (id: string, newStatus: VisitRequest['status']) => {
    try {
      const { error } = await supabase
        .from('visit_requests')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      setVisits(visits.map(visit =>
        visit.id === id ? { ...visit, status: newStatus } : visit
      ));
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    total: visits.length,
    pending: visits.filter(v => v.status === 'pending').length,
    confirmed: visits.filter(v => v.status === 'confirmed').length,
    completed: visits.filter(v => v.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-montserrat font-bold text-slate-900 mb-2">
                Demandes de visite
              </h1>
              <p className="text-slate-600 font-inter">
                Gérez les demandes de visite de vos espaces
              </p>
            </div>
            <button
              onClick={fetchVisits}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-slate-200 rounded-xl hover:border-emerald-500 transition-all"
            >
              <RefreshCw className="w-5 h-5 text-slate-600" />
              <span className="font-medium text-slate-700">Actualiser</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border-2 border-slate-200 rounded-xl p-6">
              <div className="text-3xl font-bold text-slate-900 mb-1">{stats.total}</div>
              <div className="text-sm text-slate-600 font-inter">Total</div>
            </div>
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
              <div className="text-3xl font-bold text-amber-800 mb-1">{stats.pending}</div>
              <div className="text-sm text-amber-700 font-inter">En attente</div>
            </div>
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
              <div className="text-3xl font-bold text-emerald-800 mb-1">{stats.confirmed}</div>
              <div className="text-sm text-emerald-700 font-inter">Confirmées</div>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <div className="text-3xl font-bold text-blue-800 mb-1">{stats.completed}</div>
              <div className="text-sm text-blue-700 font-inter">Terminées</div>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  filter === status
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-emerald-500'
                }`}
              >
                {status === 'all' ? 'Tous' : statusConfig[status as keyof typeof statusConfig]?.label || status}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
            <XCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        ) : visits.length === 0 ? (
          <div className="bg-white border-2 border-slate-200 rounded-xl p-12 text-center">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 font-medium">Aucune demande de visite</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visits.map((visit) => (
              <motion.div
                key={visit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-emerald-300 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-montserrat font-bold text-slate-900">
                        {visit.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border-2 ${statusConfig[visit.status].color}`}>
                        {statusConfig[visit.status].label}
                      </span>
                    </div>
                    <div className="text-sm text-slate-500 font-inter">
                      Demande reçue le {formatDateTime(visit.created_at)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <a href={`mailto:${visit.email}`} className="hover:text-emerald-600 transition-colors">
                      {visit.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <a href={`tel:${visit.phone}`} className="hover:text-emerald-600 transition-colors">
                      {visit.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <span>{formatDate(visit.preferred_date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span>{visit.preferred_time}</span>
                  </div>
                </div>

                {visit.message && (
                  <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700 font-inter">{visit.message}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 flex-wrap">
                  {visit.status !== 'confirmed' && (
                    <button
                      onClick={() => updateStatus(visit.id, 'confirmed')}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Confirmer
                    </button>
                  )}
                  {visit.status !== 'completed' && (
                    <button
                      onClick={() => updateStatus(visit.id, 'completed')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                      Marquer terminée
                    </button>
                  )}
                  {visit.status !== 'cancelled' && (
                    <button
                      onClick={() => updateStatus(visit.id, 'cancelled')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Annuler
                    </button>
                  )}
                  {visit.status === 'cancelled' && (
                    <button
                      onClick={() => updateStatus(visit.id, 'pending')}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all"
                    >
                      Réactiver
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
