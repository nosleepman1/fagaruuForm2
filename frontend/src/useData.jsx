import { useState, useEffect, useCallback } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function useStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(`${API}/api/responses/stats`)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => { setStats(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}

export function useResponses() {
  const [responses, setResponses] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchResponses = useCallback((p = 1, q = "") => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({ page: p, limit: 15 });
    if (q) params.append("search", q);
    fetch(`${API}/api/responses?${params}`)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => {
        setResponses(d.responses || []);
        setTotal(d.total || 0);
        setPages(d.pages || 1);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  useEffect(() => { fetchResponses(page, search); }, [page, search, fetchResponses]);

  return { responses, total, pages, page, setPage, search, setSearch, loading, error };
}