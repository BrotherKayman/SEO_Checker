import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SEOCheckResult {
  tag: string;
  exists: boolean;
  content: string;
}

const Container = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const Input = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '300px',
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(1),
}));

const CardStyled = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  marginTop: theme.spacing(2),
}));

const Percentage = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(2),
}));

const MarketingCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  marginTop: theme.spacing(4),
}));

const SEOCheck = () => {
  const [url, setUrl] = useState<string>('');
  const [results, setResults] = useState<SEOCheckResult[]>([]);
  const [checkedUrl, setCheckedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleCheckSEO = async () => {
    setLoading(true);
    try {
      const mockApiUrl = `https://4292740b-911c-4965-ad42-603425255508.mock.pstmn.io/seo-check?url=${encodeURIComponent(url)}`;
      const { data } = await axios.get(mockApiUrl, { responseType: 'text' });

      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');

      const title = doc.querySelector('title');
      const h1 = doc.querySelector('h1');
      const h2 = doc.querySelector('h2');
      const metaDescription = doc.querySelector('meta[name="description"]');
      const images = doc.querySelectorAll('img');

      const results: SEOCheckResult[] = [
        {
          tag: 'Title',
          exists: !!title,
          content: title?.textContent || '',
        },
        {
          tag: 'H1',
          exists: !!h1,
          content: h1?.textContent || '',
        },
        {
          tag: 'H2',
          exists: !!h2,
          content: h2?.textContent || '',
        },
        {
          tag: 'Meta Description',
          exists: !!metaDescription,
          content: metaDescription?.getAttribute('content') || '',
        },
        {
          tag: 'Images with Alt Text',
          exists: images.length > 0,
          content: `${[...images].filter(img => img.getAttribute('alt')).length}/${images.length} images have alt text`,
        },
      ];

      const score = (results.filter(result => result.exists).length / results.length) * 100;

      setResults(results);
      setCheckedUrl(url);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch or parse the mock API');
      setLoading(false);
    }
  };

  const getScore = () => {
    if (results.length === 0) return 0;
    const score = (results.filter(result => result.exists).length / results.length) * 100;
    return score.toFixed(0);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Check Your Website SEO
      </Typography>
      <Input
        label="Enter URL"
        variant="outlined"
        value={url}
        onChange={handleInputChange}
        disabled={loading}
      />
      <ButtonStyled
        variant="contained"
        color="primary"
        onClick={handleCheckSEO}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Check SEO'}
      </ButtonStyled>

      {error && <ErrorText color="error">{error}</ErrorText>}

      {results.length > 0 && !loading && (
        <>
          <CardStyled>
            <CardContent>
              <Typography variant="h6">SEO Score</Typography>
              <Percentage variant="h4">
                {getScore()}%
              </Percentage>
            </CardContent>
          </CardStyled>
          <TableContainer component={Paper} sx={{ width: '100%', maxWidth: '600px', marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Checked URL</TableCell>
                  <TableCell>Tag</TableCell>
                  <TableCell>Exists</TableCell>
                  <TableCell>Content</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell rowSpan={results.length + 1}>{checkedUrl}</TableCell>
                </TableRow>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.tag}</TableCell>
                    <TableCell>{result.exists ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{result.content}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <MarketingCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Optimize Your Website with Confidence
          </Typography>
          <Typography paragraph>
            Are you looking to enhance your website's visibility and performance? Our SEO Check tool provides a comprehensive analysis of your webpage's essential SEO elements. By simply entering your URL, you can quickly evaluate critical components such as title tags, headers, meta descriptions, and image alt texts.
          </Typography>
          <Typography paragraph>
            With our easy-to-use interface and real-time results, you can identify areas for improvement and ensure that your site is optimized for search engines. Whether you're a business owner, a digital marketer, or a web developer, our tool helps you make data-driven decisions to boost your website's SEO.
          </Typography>
          <Typography paragraph>
            Ready to take your SEO strategy to the next level? Start analyzing your website now and unlock its full potential!
          </Typography>
        </CardContent>
      </MarketingCard>
    </Container>
  );
};

export default SEOCheck;
