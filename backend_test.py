import requests
import sys
import json
from datetime import datetime

class ApexBathAPITester:
    def __init__(self, base_url="https://apex-bath-pros.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)}")
                except:
                    print(f"   Response: {response.text}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text}")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test health endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root Endpoint",
            "GET",
            "api/",
            200
        )

    def test_lead_submission(self):
        """Test lead submission endpoint"""
        lead_data = {
            "name": "John Doe",
            "phone": "(555) 123-4567",
            "email": "john.doe@example.com",
            "zipCode": "75001",
            "projectType": "full-remodel"
        }
        
        return self.run_test(
            "Lead Submission",
            "POST",
            "api/lead",
            200,
            data=lead_data
        )

    def test_lead_submission_with_webhook(self):
        """Test lead submission with webhook URL"""
        lead_data = {
            "name": "Jane Smith",
            "phone": "(555) 987-6543",
            "email": "jane.smith@example.com",
            "zipCode": "75002",
            "projectType": "shower-remodel",
            "webhookUrl": "https://httpbin.org/post"  # Test webhook endpoint
        }
        
        return self.run_test(
            "Lead Submission with Webhook",
            "POST",
            "api/lead",
            200,
            data=lead_data
        )

    def test_booking_submission(self):
        """Test booking submission endpoint"""
        booking_data = {
            "name": "Bob Johnson",
            "phone": "(555) 456-7890",
            "email": "bob.johnson@example.com",
            "zipCode": "75003",
            "projectType": "tub-to-shower",
            "appointmentDate": "Monday, January 15, 2024",
            "appointmentTime": "10:00 AM"
        }
        
        return self.run_test(
            "Booking Submission",
            "POST",
            "api/booking",
            200,
            data=booking_data
        )

    def test_booking_submission_with_webhook(self):
        """Test booking submission with webhook URL"""
        booking_data = {
            "name": "Alice Brown",
            "phone": "(555) 321-0987",
            "email": "alice.brown@example.com",
            "zipCode": "75004",
            "projectType": "full-remodel",
            "appointmentDate": "Tuesday, January 16, 2024",
            "appointmentTime": "2:00 PM",
            "webhookUrl": "https://httpbin.org/post"  # Test webhook endpoint
        }
        
        return self.run_test(
            "Booking Submission with Webhook",
            "POST",
            "api/booking",
            200,
            data=booking_data
        )

    def test_invalid_lead_submission(self):
        """Test lead submission with missing required fields"""
        invalid_lead_data = {
            "name": "Incomplete User",
            "phone": "(555) 111-2222"
            # Missing email, zipCode, projectType
        }
        
        return self.run_test(
            "Invalid Lead Submission (Missing Fields)",
            "POST",
            "api/lead",
            422,  # Expecting validation error
            data=invalid_lead_data
        )

    def test_invalid_booking_submission(self):
        """Test booking submission with missing required fields"""
        invalid_booking_data = {
            "name": "Incomplete Booking",
            "phone": "(555) 333-4444"
            # Missing other required fields
        }
        
        return self.run_test(
            "Invalid Booking Submission (Missing Fields)",
            "POST",
            "api/booking",
            422,  # Expecting validation error
            data=invalid_booking_data
        )

def main():
    print("🚀 Starting Apex Bath Remodeling Pros API Tests")
    print("=" * 60)
    
    # Setup
    tester = ApexBathAPITester()

    # Run all tests
    test_methods = [
        tester.test_health_check,
        tester.test_root_endpoint,
        tester.test_lead_submission,
        tester.test_lead_submission_with_webhook,
        tester.test_booking_submission,
        tester.test_booking_submission_with_webhook,
        tester.test_invalid_lead_submission,
        tester.test_invalid_booking_submission
    ]

    for test_method in test_methods:
        try:
            test_method()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")

    # Print results
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())