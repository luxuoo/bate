import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

// 模拟测试结果数据
const testPerformanceData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 59 },
  { name: 'Mar', value: 80 },
  { name: 'Apr', value: 81 },
  { name: 'May', value: 56 },
  { name: 'Jun', value: 55 },
  { name: 'Jul', value: 72 },
];

// 测试类型定义
const testTypes = [
  {
    id: 'unit',
    title: '单元测试',
    description: '测试独立组件和函数的功能',
    icon: 'fa-code',
    color: 'bg-blue-500',
  },
  {
    id: 'api',
    title: 'API测试',
    description: '测试API端点的响应和性能',
    icon: 'fa-exchange-alt',
    color: 'bg-green-500',
  },
  {
    id: 'ui',
    title: 'UI测试',
    description: '验证用户界面组件的渲染和交互',
    icon: 'fa-desktop',
    color: 'bg-purple-500',
  },
  {
    id: 'performance',
    title: '性能测试',
    description: '评估应用程序的响应速度和资源使用',
    icon: 'fa-tachometer-alt',
    color: 'bg-amber-500',
  },
  {
    id: 'form',
    title: '表单测试',
    description: '验证表单验证规则和提交行为',
    icon: 'fa-file-alt',
    color: 'bg-red-500',
  },
  {
    id: 'accessibility',
    title: '可访问性测试',
    description: '检查应用程序的无障碍功能支持',
    icon: 'fa-universal-access',
    color: 'bg-teal-500',
  },
];

// 测试历史记录
const testHistory = [
  { id: 1, type: '单元测试', status: 'passed', date: '2025-08-05', duration: '12s', tests: 24, passed: 24, failed: 0 },
  { id: 2, type: 'API测试', status: 'passed', date: '2025-08-04', duration: '45s', tests: 18, passed: 17, failed: 1 },
  { id: 3, type: '性能测试', status: 'warning', date: '2025-08-03', duration: '2m30s', tests: 5, passed: 4, failed: 1 },
  { id: 4, type: 'UI测试', status: 'failed', date: '2025-08-02', duration: '3m15s', tests: 12, passed: 8, failed: 4 },
];

export default function Home() {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any>(null);
  const { theme, isDark } = useTheme();

  const runTest = (testType: string) => {
    setActiveTest(testType);
    
    // 模拟测试运行
    setTimeout(() => {
      setTestResults({
        type: testType,
        passed: Math.floor(Math.random() * 10) + 8,
        failed: Math.floor(Math.random() * 3),
        duration: `${Math.floor(Math.random() * 10) + 5}s`,
        timestamp: new Date().toLocaleString(),
      });
    }, 1500);
  };

  const statusColor = (status: string) => {
    switch(status) {
      case 'passed': return 'text-green-500';
      case 'failed': return 'text-red-500';
      case 'warning': return 'text-amber-500';
      default: return 'text-gray-500';
    }
  };

  const statusIcon = (status: string) => {
    switch(status) {
      case 'passed': return 'fa-check-circle';
      case 'failed': return 'fa-times-circle';
      case 'warning': return 'fa-exclamation-triangle';
      default: return 'fa-question-circle';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-sm backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-flask text-blue-500 text-2xl"></i>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">TestHub</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="font-medium text-blue-600 dark:text-blue-400">仪表板</a>
            <a href="#" className="font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">测试历史</a>
            <a href="#" className="font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">测试配置</a>
            <a href="#" className="font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">文档</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => {}}>
              <i className="fa-solid fa-question-circle"></i>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => {}}>
              <i className="fa-solid fa-user-circle text-xl"></i>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* 欢迎区域 */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            全功能测试平台
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            一站式测试解决方案，支持单元测试、API测试、UI测试等多种测试类型，帮助您确保应用程序质量
          </p>
        </section>

        {/* 测试结果概览 */}
        {testResults && (
          <section className="mb-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transform transition-all duration-300 hover:shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">测试结果</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setTestResults(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <i className="fa-solid fa-times mr-1"></i> 关闭
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-5 border border-green-100 dark:border-green-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">通过测试</span>
                  <i className="fa-solid fa-check-circle text-green-500"></i>
                </div>
                <div className="text-3xl font-bold">{testResults.passed}</div>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-5 border border-red-100 dark:border-red-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">失败测试</span>
                  <i className="fa-solid fa-times-circle text-red-500"></i>
                </div>
                <div className="text-3xl font-bold">{testResults.failed}</div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">测试时长</span>
                  <i className="fa-solid fa-clock text-blue-500"></i>
                </div>
                <div className="text-3xl font-bold">{testResults.duration}</div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <i className="fa-solid fa-info-circle mr-2 text-blue-500"></i>
                <span>测试类型: {testTypes.find(t => t.id === testResults.type)?.title}</span>
                <span className="mx-2">•</span>
                <span>测试时间: {testResults.timestamp}</span>
              </div>
            </div>
          </section>
        )}

        {/* 测试类型卡片 */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <i className="fa-solid fa-th-large text-blue-500 mr-2"></i>
            测试类型
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testTypes.map((test) => (
              <Card key={test.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl flex items-center">
                      <span className={`${test.color} text-white p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform`}>
                        <i className={`fa-solid ${test.icon}`}></i>
                      </span>
                      {test.title}
                    </CardTitle>
                  </div>
                  <CardDescription>{test.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    className="w-full group-hover:translate-y-[-2px] transition-transform"
                    onClick={() => runTest(test.id)}
                  >
                    <i className="fa-solid fa-play mr-2"></i> 运行测试
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* 测试历史记录 */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold flex items-center">
              <i className="fa-solid fa-history text-blue-500 mr-2"></i>
              测试历史
            </h3>
            <Button variant="ghost" size="sm">查看全部</Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">测试类型</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">日期</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">时长</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">测试数</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {testHistory.map((history) => (
                    <tr key={history.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900 dark:text-gray-100">{history.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center ${statusColor(history.status)}`}>
                          <i className={`fa-solid ${statusIcon(history.status)} mr-2`}></i>
                          {history.status === 'passed' ? '通过' : history.status === 'failed' ? '失败' : '警告'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {history.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {history.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="text-green-500 font-medium">{history.passed}</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-600 dark:text-gray-300">{history.tests}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
                          <i className="fa-solid fa-eye mr-1"></i> 查看详情
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 性能测试图表 */}
        <section>
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <i className="fa-solid fa-chart-line text-blue-500 mr-2"></i>
            性能测试趋势
          </h3>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={testPerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#e5e7eb"} />
                <XAxis dataKey="name" stroke={isDark ? "#9ca3af" : "#6b7280"} />
                <YAxis stroke={isDark ? "#9ca3af" : "#6b7280"} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    borderColor: isDark ? '#374151' : '#e5e7eb',
                    color: isDark ? '#f9fafb' : '#111827'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <i className="fa-solid fa-flask text-blue-500 text-xl mr-2"></i>
              <span className="font-bold text-lg">TestHub</span>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 TestHub. 全功能测试平台.
            </div>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                <i className="fa-brands fa-github text-xl"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                <i className="fa-brands fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                <i className="fa-brands fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}