import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Users, Eye, Calendar, Home } from 'lucide-react';

interface AccessLog {
  id: string;
  pathname: string;
  userAgent: string;
  referrer: string;
  timestamp: number;
  date: string;
}

interface AccessStats {
  totalVisits: number;
  pageViews: Record<string, number>;
  dailyVisits: Record<string, number>;
  recentVisits: number | null;
}

export function AdminDashboard() {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [stats, setStats] = useState<AccessStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // 30秒ごとに自動更新
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      // ログを取得
      const logsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b40dafad/access-logs`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      const logsData = await logsResponse.json();

      // 統計を取得
      const statsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b40dafad/access-stats`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      const statsData = await statsResponse.json();

      if (logsData.success) {
        setLogs(logsData.logs);
      }

      if (statsData.success) {
        setStats(statsData.stats);
      }
    } catch (error) {
      console.error('Error fetching access data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getDeviceType = (userAgent: string) => {
    if (/mobile/i.test(userAgent)) return 'モバイル';
    if (/tablet/i.test(userAgent)) return 'タブレット';
    return 'デスクトップ';
  };

  const getBrowser = (userAgent: string) => {
    if (/chrome/i.test(userAgent) && !/edg/i.test(userAgent)) return 'Chrome';
    if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) return 'Safari';
    if (/firefox/i.test(userAgent)) return 'Firefox';
    if (/edg/i.test(userAgent)) return 'Edge';
    return 'その他';
  };

  // チャート用のデータを準備
  const chartData = stats ? Object.entries(stats.dailyVisits).map(([date, count]) => ({
    date,
    訪問数: count,
  })).sort((a, b) => a.date.localeCompare(b.date)) : [];

  const pageViewsData = stats ? Object.entries(stats.pageViews).map(([page, count]) => ({
    ページ: page === '/' ? 'トップページ' : page,
    訪問数: count,
  })).sort((a, b) => b.訪問数 - a.訪問数) : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-gray-900 mb-2">アクセスログ管理画面</h1>
            <p className="text-gray-600">
              J.F.デジタルトランスフォーメーション株式会社のウェブサイトアクセス解析
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
          >
            <Home className="h-4 w-4 mr-2" />
            メインページに戻る
          </Button>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">総訪問数</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats?.totalVisits || 0}</div>
              <p className="text-xs text-muted-foreground">累計アクセス数</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">ページビュー</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                {stats ? Object.keys(stats.pageViews).length : 0}
              </div>
              <p className="text-xs text-muted-foreground">閲覧されたページ数</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">7日間の訪問</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                {stats ? Object.values(stats.dailyVisits).reduce((a, b) => a + b, 0) : 0}
              </div>
              <p className="text-xs text-muted-foreground">過去7日間</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">最新アクセス</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                {stats?.recentVisits 
                  ? formatDate(stats.recentVisits).split(' ')[1]
                  : '--:--:--'}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.recentVisits 
                  ? formatDate(stats.recentVisits).split(' ')[0]
                  : '記録なし'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* チャート */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>日次訪問数</CardTitle>
              <CardDescription>過去7日間のアクセス推移</CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="訪問数" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  データがありません
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ページ別訪問数</CardTitle>
              <CardDescription>最もアクセスされたページ</CardDescription>
            </CardHeader>
            <CardContent>
              {pageViewsData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={pageViewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ページ" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="訪問数" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  データがありません
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* アクセスログテーブル */}
        <Card>
          <CardHeader>
            <CardTitle>アクセスログ詳細</CardTitle>
            <CardDescription>最新のアクセス記録（最大100件）</CardDescription>
          </CardHeader>
          <CardContent>
            {logs.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>日時</TableHead>
                      <TableHead>ページ</TableHead>
                      <TableHead>リファラー</TableHead>
                      <TableHead>デバイス</TableHead>
                      <TableHead>ブラウザ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.slice(0, 100).map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="whitespace-nowrap">
                          {formatDate(log.timestamp)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {log.pathname === '/' ? 'トップページ' : log.pathname}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">
                          {log.referrer === 'direct' ? (
                            <span className="text-gray-400">直接アクセス</span>
                          ) : (
                            <span className="text-xs">{log.referrer}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {getDeviceType(log.userAgent)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {getBrowser(log.userAgent)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                アクセスログがまだありません
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}