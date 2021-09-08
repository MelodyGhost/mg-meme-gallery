import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Box, Button, Link } from '@chakra-ui/react';

function last7DaysGenerator(date: any) {
  const last7Days = [];
  last7Days.unshift(
    date.toLocaleDateString('en-GB', {
      dateStyle: 'medium',
    })
  );
  for (let i = 0; i < 6; i++) {
    last7Days.unshift(
      new Date(date.setDate(date.getDate() - 1)).toLocaleDateString('en-GB', {
        dateStyle: 'medium',
      })
    );
  }
  return last7Days;
}

function dataBuilder(serverData: any, label = last7DaysGenerator(new Date())) {
  const data = label.map((date) => {
    for (let i = 0; i < serverData.length; i++) {
      const datum = serverData[i];
      const { year, month, day } = datum._id;
      const dateString = `${year}/${month}/${day}`;
      if (Date.parse(dateString) === Date.parse(date)) {
        return datum.total;
      }
    }
    return 0;
  });

  return data;
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const VerticalBar = ({ setStatsPage }: { setStatsPage: any }) => {
  const [barData, setBarData] = useState({});
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_MEME_API_URL + '/stats')
      .then(({ data }) => {
        setBarData({
          labels: last7DaysGenerator(new Date()),
          datasets: [
            {
              label: 'Upload Counts',
              data: dataBuilder(data),
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });
      });
  }, []);

  return (
    <Box mt="20px">
      <Link onClick={() => setStatsPage(false)} mr="10px">
        <Button justifySelf="flex-start"> Go back </Button>
      </Link>

      <Button width="sm" variant="outline">
        {' '}
        Stats
      </Button>

      <Box as="h2">These are the last 7 days upload</Box>
      <Bar data={barData} options={options} />
    </Box>
  );
};

export default VerticalBar;
