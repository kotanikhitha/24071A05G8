import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet to calculate movie ticket cost.
 * Developed by k.nikhitha (24071A06G8)
 */
public class TicketCalculatorServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        try {
            // Retrieve parameters from the form
            String ticketsStr = request.getParameter("tickets");
            String priceStr = request.getParameter("price");
            
            int numTickets = Integer.parseInt(ticketsStr);
            int pricePerTicket = Integer.parseInt(priceStr);
            
            // Calculate total cost
            int totalCost = numTickets * pricePerTicket;
            
            // Display Result
            out.println("<html><head><title>Booking Result</title>");
            out.println("<style>");
            out.println("body { font-family: 'Segoe UI', Arial; background: #f4f7f6; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }");
            out.println(".result-card { background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center; border-top: 8px solid #27ae60; }");
            out.println("h2 { color: #27ae60; }");
            out.println(".user-info { color: #7f8c8d; margin-bottom: 20px; font-weight: bold; }");
            out.println(".cost { font-size: 2rem; color: #2c3e50; margin: 20px 0; }");
            out.println(".back-btn { display: inline-block; padding: 10px 20px; background: #34495e; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }");
            out.println("</style></head><body>");
            
            out.println("<div class='result-card'>");
            out.println("<h2>Booking Confirmation</h2>");
            out.println("<div class='user-info'>");
            out.println("Name: k.nikhitha<br>");
            out.println("Roll No: 24071A06G8");
            out.println("</div>");
            
            out.println("<p>Tickets: <strong>" + numTickets + "</strong></p>");
            out.println("<p>Price per ticket: ₹" + pricePerTicket + "</p>");
            out.println("<div class='cost'>Total Cost: ₹" + totalCost + "</div>");
            
            out.println("<a href='index.html' class='back-btn'>Calculate Again</a>");
            out.println("</div>");
            
            out.println("</body></html>");
            
        } catch (NumberFormatException e) {
            out.println("<h3>Error: Invalid input. Please enter numbers only.</h3>");
            out.println("<a href='index.html'>Go Back</a>");
        }
    }
}
