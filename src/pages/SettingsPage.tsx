
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { 
  Settings, 
  Building, 
  Globe, 
  Mail, 
  BellRing, 
  Globe2, 
  Users 
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const handleSaveCompanyInfo = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Company information updated",
      description: "Your company information has been saved successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Company Settings</h1>
        <p className="text-muted-foreground">
          Manage your company profile and preferences.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="mr-2 h-5 w-5" />
              Company Information
            </CardTitle>
            <CardDescription>
              Update your company details and public profile.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSaveCompanyInfo}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="Acme Corporation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue="Technology" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Company Website</Label>
                <Input 
                  id="website" 
                  type="url" 
                  defaultValue="https://acmecorp.com" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  <Input id="size" defaultValue="50-200 employees" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founded">Founded</Label>
                  <Input id="founded" defaultValue="2010" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea 
                  id="description" 
                  rows={4}
                  defaultValue="Acme Corporation is a leading technology company specializing in innovative software solutions for businesses of all sizes. With a focus on cutting-edge technology and exceptional customer service, we help organizations streamline their operations and achieve their goals."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="headquarters">Headquarters</Label>
                <Input id="headquarters" defaultValue="New York, NY, USA" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          </form>
        </Card>
        
        {/* Branding Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe2 className="mr-2 h-5 w-5" />
              Branding Settings
            </CardTitle>
            <CardDescription>
              Customize how your company appears to candidates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="logoUpload">Company Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 flex items-center justify-center border rounded-md bg-muted">
                  <Building className="h-8 w-8 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm">
                  Upload New Logo
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Brand Primary Color</Label>
              <div className="flex gap-2">
                <Input 
                  id="primaryColor" 
                  defaultValue="#0f52ba" 
                  className="flex-1"
                />
                <div 
                  className="w-12 h-9 rounded-md border" 
                  style={{ backgroundColor: '#0f52ba' }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverImage">Career Page Cover Image</Label>
              <div className="flex items-center gap-4">
                <div className="w-full h-20 border rounded-md bg-muted flex items-center justify-center">
                  <Globe className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                Upload Cover Image
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Branding</Button>
          </CardFooter>
        </Card>
        
        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              Email Settings
            </CardTitle>
            <CardDescription>
              Configure email notifications and templates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notificationEmail">Notification Email</Label>
              <Input 
                id="notificationEmail" 
                type="email"
                defaultValue="hr@acmecorp.com" 
              />
              <p className="text-xs text-muted-foreground mt-1">
                This email will receive all job application notifications.
              </p>
            </div>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-3">Email Notifications</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Applications</p>
                    <p className="text-sm text-muted-foreground">Email notifications for new job applications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Application Status Updates</p>
                    <p className="text-sm text-muted-foreground">Email when candidates are moved through stages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Job Performance Report</p>
                    <p className="text-sm text-muted-foreground">Weekly summary of job post performance</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Email Settings</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
