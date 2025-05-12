
import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Users, 
  UserCheck, 
  Eye, 
  Clock, 
  TrendingUp 
} from 'lucide-react';

const Dashboard = () => {
  const { jobs } = useAppSelector(state => state.jobs);
  const { profile } = useAppSelector(state => state.user);
  
  // Calculate dashboard metrics
  const activeJobs = jobs.filter(job => job.status === 'active').length;
  const totalApplicants = jobs.reduce((total, job) => total + job.applicants, 0);
  const recentApplicants = 14; // Mock data
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {profile?.firstName}! Here's an overview of your recruitment activities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Job Posts</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs}</div>
            <p className="text-xs text-muted-foreground">
              +2 posted this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalApplicants}</div>
            <p className="text-xs text-muted-foreground">
              {recentApplicants} new this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time to Hire</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 days</div>
            <p className="text-xs text-muted-foreground">
              -2 days from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Job Posts</CardTitle>
            <CardDescription>Your most recently created job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobs.slice(0, 5).map((job) => (
                <div key={job.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{job.department}</span>
                      <span className="mx-2">•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">{job.applicants} applicants</div>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Button variant="outline" className="w-full">View All Jobs</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recruitment Activity</CardTitle>
            <CardDescription>Summary of your most recent activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">New job post created</p>
                  <p className="text-sm text-muted-foreground">You created a new job post for "Backend Developer"</p>
                  <p className="text-xs text-muted-foreground mt-1">Today at 9:42 AM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <UserCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Candidate moved to interview stage</p>
                  <p className="text-sm text-muted-foreground">Jordan Smith was moved to the interview stage for "Product Manager"</p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday at 2:30 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Job views milestone</p>
                  <p className="text-sm text-muted-foreground">"Senior Software Engineer" reached 1,000 views</p>
                  <p className="text-xs text-muted-foreground mt-1">2 days ago at 10:15 AM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
