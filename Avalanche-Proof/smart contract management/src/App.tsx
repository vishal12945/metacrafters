import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { provider, signer } from './ethers.ts';
import Currency from '../build/contracts/Currency.json';
import { Circles, CirclesWithBar, ThreeCircles, InfinitySpin } from 'react-loader-spinner'
import { disabled } from 'express/lib/application.js';

const App: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [receiver, setReceiver] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [balance, setBalance] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(false)
  const [currency, setCurrency] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!provider || !signer) {
        console.error('Provider is not initialized');
        return;
      }
      try {
        setLoading(true)
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setLoading(false)

        const networkId = await provider.getNetwork().then(network => network.chainId);
        console.log(Currency.networks)
        const deployedNetwork = Currency.networks[networkId];
        console.log(deployedNetwork)
        const contractInstance = new ethers.Contract(
          deployedNetwork.address,
          Currency.abi,
          signer
        );

        setCurrency(contractInstance);

        const accountBalance = await contractInstance.bank(accounts[0]);
        setBalance(ethers.utils.formatUnits(accountBalance, 18));
      } catch (error) {
        setLoading(false)
        console.error('Error initializing', error);
      }
    };

    init();
  }, []);

  const handlePrint = async () => {
    if (!currency || amount <= 0) return;
    try {
      setLoading(true)
      const tx = await currency.Print(account, ethers.utils.parseUnits(amount.toString(), 18));
      await tx.wait();
      setLoading(false)
      console.log(tx)
      const newBalance = await currency.bank(account);
      setBalance(ethers.utils.formatUnits(newBalance, 18));
    } catch (error) {
      setLoading(false)
      console.error('Error printing currency', error);
    }
  };

  const handleSpend = async () => {
    if (!currency || amount <= 0) return;
    try {
      setLoading(true)
      const tx = await currency.Spend(account, ethers.utils.parseUnits(amount.toString(), 18));
      await tx.wait();
      setLoading(false)
      console.log(tx)
      const newBalance = await currency.bank(account);
      setBalance(ethers.utils.formatUnits(newBalance, 18));
    } catch (error) {
      setLoading(false)
      console.error('Error spending currency', error);
    }
  };
  const handleTransfer = async()=>{
    if (!currency ) return;
    try {
      setLoading(true)
      const tx = await currency.Transfer(account , receiver,ethers.utils.parseEther(amount.toString())  );
      await tx.wait();
      console.log(tx);
      setLoading(false)
      console.log(tx)
      const newBalance = await currency.bank(account);
      setBalance(ethers.utils.formatUnits(newBalance, 18));
    } catch (error) {
      console.log(error);
      setLoading(false)
      console.error('Error transfering currency', error);
    }
  }

  return (
    <div className='max-w-4xl mx-auto my-10 p-6 bg-gray-100 shadow-lg rounded-lg'>

      <h1 className='text-5xl font-bold text-center text-blue-600 mb-8'>Banking website</h1>

      <h3 className='text-xl font-medium text-gray-800 mb-4'>Account: <span className='text-gray-600'>{account}</span></h3>

      <h3 className='text-xl font-medium text-gray-800 mb-8 flex items-center'>
        Balance: {loading ? <ThreeCircles height={40}/> : <span className='text-gray-600'> {balance}</span>}
      </h3>
      
      <form className='mb-8 flex flex-col gap-4'>
        <input type="number" className='border-2 py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400' placeholder='Amount' onChange={(e) => { setAmount(parseInt(e.target.value)) }} />
        <button className='self-center w-40 text-white shadow-md bg-blue-600 hover:bg-blue-700 font-semibold text-lg rounded-full px-5 py-2' onClick={handlePrint} disabled={loading}>Print</button>
      </form>

      <form className='mb-8 flex flex-col gap-4'>
        <input type="number" className='border-2 py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400' placeholder='Amount' onChange={(e) => { setAmount(parseInt(e.target.value)) }} />
        <button className='self-center w-40 text-white shadow-md bg-blue-600 hover:bg-blue-700 font-semibold text-lg rounded-full px-5 py-2' onClick={handleSpend} disabled={loading}>Burn</button>
      </form>
      
      <form className='flex flex-col gap-4'>
        <input type="number" className='border-2 py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400' placeholder='Amount' onChange={(e) => { setAmount(parseInt(e.target.value)) }} />
        <input type='text' className='border-2 py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400' placeholder='Receiver address' onChange={(e) => { setReceiver(e.target.value) }} />
        <button className='self-center w-40 text-white shadow-md bg-blue-600 hover:bg-blue-700 font-semibold text-lg rounded-full px-5 py-2' onClick={handleTransfer} disabled={loading}>Transfer</button>
      </form>
  
  </div>
  );
};

export default App;
