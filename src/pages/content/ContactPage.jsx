import ContentPage from '../../components/layout/ContentPage';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function ContactPage() {
  usePageTitle('Contact');

  return (
    <ContentPage title="Contact Us">
      <p>
        Whether you have a question about a product, need help with an
        order, or want to discuss a leasing arrangement, we're here to
        help.
      </p>

      <h2>Head office</h2>
      <p>
        CBG InfoTech Sdn Bhd
        <br />
        Level 12, Menara CBG
        <br />
        Jalan Ampang
        <br />
        50450 Kuala Lumpur
        <br />
        Malaysia
      </p>

      <h2>Phone</h2>
      <p>
        <a href="tel:+60321234567">+60 3-2123 4567</a>
      </p>

      <h2>Email</h2>
      <p>
        General enquiries: <a href="mailto:hello@cbginfotech.com">hello@cbginfotech.com</a>
        <br />
        Sales: <a href="mailto:sales@cbginfotech.com">sales@cbginfotech.com</a>
        <br />
        Support: <a href="mailto:support@cbginfotech.com">support@cbginfotech.com</a>
      </p>

      <h2>Business hours</h2>
      <p>
        Monday to Friday, 9:00 AM – 6:00 PM (MYT)
        <br />
        Closed on weekends and public holidays.
      </p>

      <h2>Response times</h2>
      <p>
        We aim to respond to all enquiries within one business day. For
        urgent order issues, please include your order ID in the subject
        line so we can route your message quickly.
      </p>
    </ContentPage>
  );
}