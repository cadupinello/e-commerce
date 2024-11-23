import styled from "styled-components";

export const ListItem = styled('div')(({ active }) => ({
  width: '15%',
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  ul: {
    width: '100%',
    padding: 0,
    margin: 0
  },

  li: {
    width: '100%',
    height: '32px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: '14px',
    cursor: 'pointer',

    a: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '5px',
      textDecoration: 'none',
      color: '#000',

      '&:hover': {
        backgroundColor: '#099ee4',
        color: '#fff',
        borderRadius: '4px',
        transition: 'all 0.3s ease-in-out',
      },
    },

  }
}))
